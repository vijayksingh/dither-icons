# Releases

One stable tag releases **`@unlocalhosted/dither-icons`** and **https://dithered.dev** from the same commit. The repository is `vijayksingh/dither-icons`. `.github/workflows/ci.yml` checks main pushes and pull requests; `.github/workflows/release.yml` handles `vX.Y.Z` tags. Main pushes do not publish.

## Normal release

1. Finish and commit the scoped work on `main`; wait for CI to pass.
2. Choose the next unused stable SemVer version. Use a patch for compatible fixes, minor for compatible features, and major for breaking changes. During 0.x, describe any breaking changes explicitly. This workflow rejects prerelease tags.
3. Run `npm version patch --no-git-tag-version` (or the intended explicit version), then `npm run generate:docs` so generated manifests and references carry the new version. Commit the version, lockfile, and regenerated tracked docs together. Push main and wait for CI.
4. Tag that exact commit, for example `git tag -a v0.1.1 -m 'Release v0.1.1'`, then `git push origin v0.1.1`. Never reuse or force-move release tags.
5. Follow the **Release** workflow with `gh run list --workflow release.yml` and `gh run watch <run-id> --exit-status`. A successful tag push is not a completed release.
6. Open `https://dithered.dev` in a normal browser and perform the checks in [DEPLOYMENT.md](DEPLOYMENT.md). Report the npm version, source SHA, successful workflow URL, and verified domain.

## What the release verifies

The build job checks that the tag matches both package versions and that its commit belongs to main. It typechecks, runs tests, builds the package and website, checks the seven-file package allowlist, and tests an isolated consumer with actual registry React dependencies. Every icon renders through the installed package, and its public TypeScript declarations compile.

The built tarball, website archive, package integrity, version, and source SHA are passed between jobs as a single GitHub Actions artifact. Publish uses that tarball with npm OIDC. It checks the public registry integrity and `latest`, then repeats the consumer test against the exact published version.

Only after npm passes does deployment upload the prepared website to Cloudflare Pages `dither-icons`, branch `main`. The public `/release.json` identifies its package version, commit, and tarball integrity. The final check uses normal DNS and HTTPS, verifies that source SHA, page metadata, sharing PNGs, scripts/styles, and crawler files. A GitHub Release with package artifacts is created after those checks succeed.

## One-time credentials and bootstrap

- **npm:** first publish requires the owner's interactive 2FA. Publish the reviewed `release/package.tgz`; no bypass token. Then configure its npm **Trusted Publisher**: GitHub Actions; owner `vijayksingh`; repository `dither-icons`; workflow filename `release.yml`; no environment name. Enable direct `npm publish` permission. The workflow uses GitHub-hosted runners, Node 24, npm 12.0.2, and `id-token: write`; no `NPM_TOKEN` is needed. Saving the publisher alone does not prove it works: a successful publish job is required.
- **Cloudflare:** repository Actions secret `CLOUDFLARE_API_TOKEN` authorizes Pages edits in account `e3ae6e5dd1aac7f5d4c1d4aa45c00f83`. The existing infra credential is stored at `/opt/infra/secrets/cloudflare.env` on `vm-agent`; use the existing infra wrapper for manual recovery. Never print its value, place it in files in this repo, or ask the owner to paste it into chat. Only the deploy step receives this secret.
- **Domain:** the Pages custom-domain association and proxied apex CNAME must both exist. See [DEPLOYMENT.md](DEPLOYMENT.md).

For the first release only, bootstrap npm with the artifact from the exact tagged source, then configure its trusted publisher and rerun the release. The publish job can accept an existing version only when its integrity matches the build exactly. If they differ, investigate and issue a new version; do not weaken the check.

A successful email login is not proof of permission to publish. If publication returns a 2FA requirement, inspect whether a security key/passkey is actually registered; an account's `auth-and-writes` policy alone is insufficient evidence. Have the owner complete device authentication and save recovery codes privately. Keep CLI login sessions alive during browser verification, check the CLI completion result, and do not start overlapping login attempts or reuse expired codes.

Once the package exists, the trusted publisher can also be configured through the official CLI:

```sh
npx --yes npm@12.0.2 trust github @unlocalhosted/dither-icons \
  --repository vijayksingh/dither-icons --file release.yml --allow-publish --yes
npx --yes npm@12.0.2 trust list @unlocalhosted/dither-icons --json
```

Complete the owner's security-key prompt if requested. These commands configure trust; only a subsequent successful OIDC publication proves the release path works.

## Failure and recovery

Use `gh run view <run-id> --log-failed` to identify the failed job. Fix missing external configuration and use `gh run rerun <run-id> --failed` when the tag and artifacts remain correct. npm publication is immutable: if publish succeeded but deployment failed, the retry verifies the existing package and resumes deployment without another publish.

If a workflow or source fix is needed after publication, commit it and release a new patch version. Do not edit or move the old tag. Old release runs refuse to displace a newer npm `latest`. Site-only emergency recovery may deploy a previously verified website through the infra wrapper, but record the rollback and restore package/site alignment with the next release; never claim its version matches until `/release.json` proves it.

For local preflight: `npm run typecheck`, `npm test`, `npm run build`, `node scripts/release-package.mjs prepare`, and `npm run verify:consumer -- release/package.tgz`. `npm run verify:deployment` checks the live site; set `RELEASE_SHA=<commit>` to require a particular deployed revision. These commands do not publish.

References: [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/), [Cloudflare Direct Upload CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/).

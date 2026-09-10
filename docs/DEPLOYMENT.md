# Deploy to Cloudflare Pages

The production Pages project is **`dither-icons`**, serving **https://dithered.dev**. It uses **Direct Upload** through the tagged [release workflow](RELEASING.md). Pushing main to `vijayksingh/dither-icons` runs CI; pushing a stable `vX.Y.Z` tag publishes npm and then deploys the same release to the website.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `site-dist` |
| Root directory | Repository root |
| CI Node version | `24` |
| Environment variable | `SITE_URL=https://dithered.dev` |

For manual recovery, build the revision being released with `SITE_URL=https://dithered.dev npm run build`, then `node scripts/release-package.mjs prepare` to stamp `site-dist/release.json`. Transfer the complete `site-dist` directory to the infra machine, then run the existing credential wrapper there:

```sh
/home/admin/projects/craftingattention/scripts/wrangler-infra pages deploy /path/to/site-dist \
  --project-name dither-icons --branch main --commit-hash <release-sha> --commit-dirty=false
```

The manual-recovery credential remains in the root-owned infra secret file and is restricted to that machine's IP. GitHub Actions uses a separate Pages Edit token, as documented in [RELEASING.md](RELEASING.md). Do not copy either credential into this repository. Record the deployment URL and source commit, then verify the custom domain below.

The `dist` directory is the React library, not the website. Publish the complete `site-dist` directory. It includes downloadable packages, documentation, route-specific HTML for every public page, social PNGs, robots.txt, and a sitemap.

After the first successful deployment, open the Pages project's **Custom domains**, add `dithered.dev`, and follow Cloudflare's DNS setup. Domain registration alone does not attach it to the Pages project. Wait for the custom domain to become active with HTTPS.

The Cloudflare DNS zone needs a **proxied CNAME** from `@` (`dithered.dev`) to `dither-icons.pages.dev`. The Pages domain association alone is insufficient. Verify the domain, validation, and certificate are active.

Pages serves existing HTML routes and provides a native SPA fallback. Do not add a catch-all rewrite to `/index.html`: each generated route contains its own sharing metadata.

Run `npm run verify:deployment` from the visitor machine using its normal DNS. This checks HTTPS, representative routes, canonical URLs, sharing images, JS/CSS responses, robots.txt, and sitemap.xml. A failed lookup must fail the release check; do not override DNS to turn it green. `SITE_URL` can select another deployment, but that result does not verify `dithered.dev`.

Then open **https://dithered.dev/** in a normal browser. Confirm the page renders, search filters icons, an icon detail page opens, navigation works, and the console has no application errors. Check the package download. A successful build, Pages preview, or server-side HTTP probe does not replace this browser check. Social services can cache earlier previews; use their refresh tools after deployment.

If the browser reports `ERR_NAME_NOT_RESOLVED` / `DNS_PROBE_FINISHED_NXDOMAIN`, compare the local resolver with authoritative/public DNS. A router can retain a negative answer from before the CNAME existed. Inspect the remaining SOA TTL with `dig dithered.dev A +noall +answer +authority`, wait for expiry, and retry the ordinary URL. Report the browser failure until that check passes; do not claim the visitor path works based only on an external server or a forced IP address.

No hosting credentials are needed for the build. The release workflow supplies the repository's Cloudflare Actions secret only to its deployment step. Read [RELEASING.md](RELEASING.md) for tag rules, npm trusted publishing, and recovery from partial releases.

References: [Vite on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/), [Pages routing](https://developers.cloudflare.com/pages/configuration/serving-pages/).

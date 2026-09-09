# Deploy to Cloudflare Pages

Connect `vijayksingh/dither-icons` in Cloudflare Workers & Pages and select **Pages** with Git integration.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `site-dist` |
| Root directory | Repository root |
| Node version | `22` |
| Environment variable | `SITE_URL=https://dithered.dev` |

The `dist` directory is the React library, not the website. Publish the complete `site-dist` directory. It includes downloadable packages, documentation, 77 route-specific HTML entries, social PNGs, robots.txt, and a sitemap.

After the first successful deployment, open the Pages project's **Custom domains**, add `dithered.dev`, and follow Cloudflare's DNS setup. Domain registration alone does not attach it to the Pages project. Wait for the custom domain to become active with HTTPS.

Pages serves existing HTML routes and provides a native SPA fallback. Do not add a catch-all rewrite to `/index.html`: each generated route contains its own sharing metadata.

Verify `/`, `/motion`, `/ai`, `/docs/react`, and `/icons/download` directly on the public domain. Check the package download and `/og/home.png`. View page source on a deep link to confirm its canonical URL and image use `https://dithered.dev`. Social services can cache earlier previews; use their refresh tools after deployment.

No hosting credentials are needed for the build. Cloudflare's connected repository integration handles publication on pushes to `main`.

References: [Vite on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/), [Pages routing](https://developers.cloudflare.com/pages/configuration/serving-pages/).

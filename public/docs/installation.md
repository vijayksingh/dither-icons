# In your project in minutes.

A local package for React. A standalone SVG for everywhere else.

## 01. Take the package.

Download the .tgz package using Get the library. Place it in your application directory, then install it using your package manager.

```sh
npm install ./unlocalhosted-dither-icons-0.1.0.tgz
```

> Run this command in the directory containing the downloaded file, or replace the relative path with its actual location. A bare npm install @unlocalhosted/dither-icons is not available yet.

## 02. Add an icon.

```tsx
import { DownloadIcon } from '@unlocalhosted/dither-icons';

<button className="di-trigger" aria-label="Download file">
  <DownloadIcon size={48} texture="dither" />
</button>
```

Add di-trigger to the parent button to make its entire hit area respond. Keep your real onClick action on that button. Playing a preview does not perform a download or change application state.

## 03. Match your environment.

| Environment | Integration |
| --- | --- |
| React 18 / 19 | Use the named exports in your existing React build. |
| Server-component frameworks | Import animated icons from a client component. Put "use client" at the top of that wrapper where your framework requires it. |
| Plain HTML / other frameworks | Open an icon page and download its standalone SVG. Inline the markup for hover animation. |
| Image elements | Use a downloaded SVG in an <img> for its static appearance. Image embedding does not expose its internal hover targets. |

## Working on the library itself?

```sh
npm install
npm run dev

# Package + public site
npm run build

# Package only
npm pack
```

The development catalog runs on port 4192. The build creates the React package in dist and the public site in site-dist. AI.md and icons.json are included in the package; the website also serves the full guides and visual references.

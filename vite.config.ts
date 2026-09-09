import { defineConfig, loadEnv } from 'vite';
import { injectSocial, sharePage, siteOrigin } from './demo/content/social';
export default defineConfig(({mode}) => {
  const origin = siteOrigin(process.env.SITE_URL || loadEnv(mode,process.cwd(),'SITE_').SITE_URL);
  return {build:{outDir:'site-dist'},plugins:[{name:'static-social-metadata',transformIndexHtml(html,context){return injectSocial(html,sharePage((context.originalUrl || context.path).split('?')[0]),origin);}}]};
});

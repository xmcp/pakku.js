import { defineConfig } from 'vite';
//import { crx } from '@crxjs/vite-plugin';
//import manifest from './pakkujs/manifest.json';

let dist_name = process.env.BUILD_DIST_NAME;

// https://vitejs.dev/config/
export default defineConfig({
  /*plugins: [
    crx({
      manifest,
    }),
  ],*/
  root: 'pakkujs',
  publicDir: '../pakkujs_public',
  envPrefix: 'PAKKU_',
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
  build: {
    rollupOptions: {
      input: {
        'options': './pakkujs/page/options.html',
        'popup': './pakkujs/page/popup.html',
        'background': './pakkujs/background/background.ts',
        'injected': './pakkujs/injected/script_injector.ts',
      },
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: 'assets/[name].js',
        minifyInternalExports: false,
      }
    },
    modulePreload: false,
    outDir: `../dist/${dist_name}`,
    minify: false,
    emptyOutDir: true,
  }
});

import { defineConfig } from 'vite';
//import { crx } from '@crxjs/vite-plugin';
//import manifest from './pakkujs/manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  /*plugins: [
    crx({
      manifest,
    }),
  ],*/
  root: 'pakkujs',
  publicDir: '../pakkujs_public',
  esbuild: {
    minifyWhitespace: false, // to make stack trace more readable
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
      }
    },
    modulePreload: false,
    outDir: '../dist/pakkujs',
    emptyOutDir: true,
  }
});

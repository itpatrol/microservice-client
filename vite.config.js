import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default function (build) {
  const mapSettings = {
    outDir: 'dist/',
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./node_modules', import.meta.url)),
      './debug.js': './debug-browser.js',
    },
  };

  return defineConfig({
    plugins: [],
    resolve: {
      alias: mapSettings.alias,
    },
    define: {
      process: {},
    },
    build: {
      sourcemap: true,
      outDir: mapSettings.outDir,
      lib: {
        entry: './src/MicroserviceClient.js',
        name: 'MicroserviceClient',
        // the proper extensions will be added
        fileName: 'microservice-client',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {},
        },
      },
    },
  });
}

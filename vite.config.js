/*global process, __dirname*/
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";


// https://vitejs.dev/config/
export default function (build) {

  var mapSettings = {
    "outDir": "dist/",
    "alias": {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "#": fileURLToPath(new URL("./node_modules", import.meta.url))
    }
  };

  return defineConfig({
    plugins: [],
    resolve: {
      alias: mapSettings.alias,
    },
    build: {
      outDir: mapSettings.outDir,
      lib: {
        entry: './index.js',
        name: "MicroserviceClient",
        // the proper extensions will be added
        fileName: "microservice-client",
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
          },
        },
      },
    },
  });
}

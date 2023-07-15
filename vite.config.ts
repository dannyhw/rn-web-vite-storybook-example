import react from "@vitejs/plugin-react";

import { Plugin, defineConfig } from "vite";

export function reactNativeWeb(options: { babelPlugins: Array<any> }): Plugin {
  const plugin: Plugin = {
    name: "vite:react-native-web",
    enforce: "pre",
    config(_userConfig, env) {
      return {
        plugins: [
          react({
            babel: {
              plugins: options.babelPlugins,
            },
          }),
        ],
        define: {
          // reanimated support
          "global.__x": {},
          _frameTimestamp: undefined,
          _WORKLET: false,
          __DEV__: `${env.mode === "development" ? true : false}`,
          "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || env.mode
          ),
        },
        optimizeDeps: {
          include: ["react-native-reanimated"],
          esbuildOptions: {
            jsx: "transform",
            resolveExtensions: [
              ".web.js",
              ".web.ts",
              ".web.tsx",
              ".js",
              ".jsx",
              ".json",
              ".ts",
              ".tsx",
              ".mjs",
            ],
            loader: {
              ".js": "jsx",
            },
          },
        },
        resolve: {
          extensions: [
            ".web.js",
            ".web.ts",
            ".web.tsx",
            ".js",
            ".jsx",
            ".json",
            ".ts",
            ".tsx",
            ".mjs",
          ],
          alias: {
            "react-native": "react-native-web",
          },
        },
      };
    },
  };

  return plugin;
}

export default defineConfig({
  plugins: [
    reactNativeWeb({
      babelPlugins: [
        "@babel/plugin-proposal-export-namespace-from",
        "react-native-reanimated/plugin",
      ],
    }),
  ],
});

import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";
import { InlineConfig, transformWithEsbuild } from "vite";
import commonjs from "vite-plugin-commonjs";
// @ts-expect-error no types
import { esbuildFlowPlugin, flowPlugin } from "@bunchtogether/vite-plugin-flow";
import { defineConfig } from "vite";

const extensions = [
  ".web.js",
  ".web.ts",
  ".web.tsx",
  ".web.mjs",
  ".web.cjs",
  ".js",
  ".jsx",
  ".json",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
];

const exclude = /\/node_modules\/(?!react-native|@react-native|expo|@expo)/;

export default defineConfig({
  define: {
    // yeah weird I know
    global: "window",
    DEV: JSON.stringify(process.env.NODE_ENV === "development"),
    // don't even remember anymore
    "global.__x": {},
    // reanimated stuff
    _frameTimestamp: undefined,
    // reanimated stuff
    _WORKLET: false,
    // expected by most react native code
    __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    // expected by some expo libraries
    EXPO_OS: JSON.stringify("web"),
    "process.env.EXPO_OS": JSON.stringify("web"),
    // something in reanimated seemed to need this
    "global.Error": "Error",
  },
  esbuild: {
    jsx: "automatic",
  },
  optimizeDeps: {
    esbuildOptions: {
      jsx: "automatic",
      resolveExtensions: extensions,
      loader: {
        ".js": "jsx",
      },
      plugins: [
        esbuildFlowPlugin(
          new RegExp(/\.(flow|jsx?)$/),
          (_path: string) => "jsx"
        ),
      ],
    },
  },
  resolve: {
    extensions,
    alias: {
      "react-native": "react-native-web",
    },
  },
  plugins: [
    flowPlugin({
      exclude,
    }),
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/\.js$/)) return null;
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
    commonjs(),
    react({
      jsxRuntime: "automatic",
      babel: {
        babelrc: false,
        configFile: false,
        plugins: ["react-native-reanimated/plugin"],
      },
    }),
    // handles node modules code
    babel({
      include: [
        // include the modules you want to transpile here
        /node_modules\/(react-native|@react-native|expo|@expo)/,
      ],
      babelConfig: {
        babelrc: false,
        configFile: false,
        presets: [
          [
            "@babel/preset-react",
            {
              development: process.env.NODE_ENV === "development",
              runtime: "automatic",
            },
          ],
        ],
        plugins: [
          [
            // this is a fix for reanimated not working in production
            "@babel/plugin-transform-modules-commonjs",
            {
              strict: false,
              strictMode: false, // prevent "use strict" injections
              allowTopLevelThis: true, // dont rewrite global `this` -> `undefined`
            },
          ],
        ],
      },
    }),
  ],
} satisfies InlineConfig);

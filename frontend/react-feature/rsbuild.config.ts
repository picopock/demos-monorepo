import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';

export default defineConfig({
  source: {
    // entry: {
    //   index: "./src/index.tsx",
    // },
    // assetsInclude: /\.pdf$/,
    define: {
      'process.env.TOP': JSON.stringify(36),
    },
    transformImport: [
      // {
      //   libraryName: 'lodash',
      //   customName: 'lodash/{{ member }}',
      // },
    ],
  },
  output: {
    // target: "web",
    polyfill: 'usage',
    assetPrefix: '/',
    // distPath: {
    //   html: "/",
    //   image: "static/image",
    //   svg: "static/svg",
    //   font: "static/font",
    //   media: "static/media",
    // },
    copy: [
    ],
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: 'automatic',
      },
      splitChunks: {
        react: true,
        router: true,
      },
    }),
    pluginSass(),
    pluginSvgr(), // 如果导入的路径包含 ?react 后缀，Rsbuild 会调用 SVGR，将 SVG 图片转换为一个 React 组件
    pluginTypeCheck(),
    pluginTypedCSSModules(),
  ],
  html: {
    template: './public/index.html',
    templateParameters: {},
  },
  server: {
    // base: "/",
    // htmlFallback: "index",
    publicDir: {
      name: 'public',
      copyOnBuild: false,
    },
  },
  performance: {
    removeConsole: true,
    // bundleAnalyze: {},
  },
  tools: {
    // lightningcssLoader: {},
    // rspack: (config, { env }) => {
    //   if (env === 'development') {
    //     config.devtool = 'cheap-module-eval-source-map';
    //   }
    //   return config;
    // },
  },
});

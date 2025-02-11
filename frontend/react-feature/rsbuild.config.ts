import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

export default defineConfig({
  source: {
    define: {
      'process.env.TOP': JSON.stringify(36),
    },
    transformImport: [
      {
        libraryName: 'lodash-es',
        customName: 'lodash-es/{{ member }}',
      },
    ],
  },
  output: {
    polyfill: 'usage',
    assetPrefix: '/',
    copy: [
      // `./public/*.*` -> `./dist/*.*`
      {
        from: './public',
        globOptions: {
          ignore: ['*/index.html'],
        },
      },
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
  ],
  html: {
    template: './public/index.html',
    templateParameters: {},
  },
  server: {
    publicDir: {
      name: 'public',
      copyOnBuild: false,
    },
  },
  performance: {
    removeConsole: true,
  },
  // experiments: {
  //   css: true
  // }
});

import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue' // SFC
import vueJsx from '@vitejs/plugin-vue-jsx' // 

const defineEnv  = () => {
  const env = process.env
  const partEnv = {
    BASE_URL: "/"
  }
  Object.keys(partEnv).forEach(k => {
    env[k] = partEnv[k]
  })
  return env
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': defineEnv()
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    vue(),
    vueJsx({
      babelPlugins: [
        [
          "@babel/plugin-proposal-decorators",
          {
            "legacy": true
          }
        ]
      ]
    })
  ],
  server: {
    port: 8888
  }
})

import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    port: "3000",
  },
  build: {
    outDir: "lib",
    lib: {
      //库编译模式配置
      entry: resolve(__dirname, "packages/wal-table-pagination/index.js"), //指定组件编译入口文件
      name: "WalTablePagination",
      fileName: (format) => `wal-table-pagination.${format}.js`,
    },
    rollupOptions: {
      //rollup打包配置
      external: ["vue", "element-plus"], // 指定外部依赖
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "element-plus": "elementPlus",
        },
      },
    },
  },
  test: {
    // 启用类似 jest 的全局测试 API,这样就无需在每个test文件中单独引入测试相关api
    global: true,
    // 使用 happy-dom 模拟 DOM
    // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./packages"),
    },
  },
  plugins: [vue()],
});

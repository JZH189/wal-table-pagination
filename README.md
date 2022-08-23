# 简介
wal-table-pagination 是基于element-plus 的 el-table 和 el-pagination组件的基础上进行开发的。并且组件的 api 达到了 99% 接近 el-table 和 el-pagination的使用方式 。一句话概括就是只要你会用element-plus的 table 和 pagination 组件就会用 wal-table-pagination 组件！这样做的好处是帮你减少了上手 api 的理解负担。

在使用 wal-table-pagination 组件时以下三个 props 必传：

- data: 渲染表格的数据
- currentPage：显示当前分页
- total :总数据条数，据此计算出页码
### 快速安装使用
```
$ npm install --save-dev wal-table-pagination
```

### 在main.js引入插件
```js
// main.js

import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import WalTablePagination from 'wal-table-pagination'

const app = createApp(App)
app.use(ElementPlus)
    .use(WalTablePagination)
    .mount('#app')

```

**请确保你的项目引入了如下两行代码, 因为本插件依赖于 element-plus：**
```js
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
```
**其实我更推荐使用自动按需引入的方式使用 element-plus：**

首先你需要安装unplugin-vue-components 和 unplugin-auto-import这两款插件

```js
npm install -D unplugin-vue-components unplugin-auto-import
```
然后把下列代码插入到你的 Vite 或 Webpack 的配置文件中

**Vite**
```js
// vite.config.js
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```
**Webpack**

```js
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

### 在.vue文件中使用插件

```html
<template>
  <div style="text-align: center;">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])"
      >切换2，3项的选中状态</el-button
    >
    <el-button @click="toggleSelection()">清空所选</el-button>
  </div>
  <WaltablePagination
    style="width:800px;margin: 20px auto 0px;"
    ref="waltablePagination"
    border
    :max-height="500"
    :data="tableData"
    :total="pagination.total"
    :current-page="pagination.currenPage"
    :page-size="pagination.pageSize"
    @selection-change="handleSelectionChange"
    @size-change="handleSizeChange"
    @pagination-current-change="handlePaginationCurrentChange"
  >
    <el-table-column type="selection" fixed="left" width="80px" />
    <el-table-column prop="date" label="Date" min-width="200px" />
    <el-table-column prop="name" label="Name" min-width="200px" />
    <el-table-column prop="address" label="Address" min-width="300px" />
    <el-table-column label="Operations" fixed="right" min-width="100px">
      <template #default="{ row }">
        <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
      </template>
    </el-table-column>
  </WaltablePagination>
</template>

<script setup>
import { reactive, ref, onMounted} from 'vue'
//WaltablePagination实例
const waltablePagination = ref()  
//选中的table项
const selections = ref([]) 
//table数据
const tableData = ref([])  
//分页配置
const pagination = reactive({
  currenPage: 1,
  pageSize: 10,
  total: 200,
})
// pageSize变化
function handleSizeChange(val) {
  pagination.pageSize = val
  fetchData()
}
// currenPage变化
function handlePaginationCurrentChange(val) {
  pagination.currenPage = val
  fetchData()
}
// 编辑表格行
function handleEdit(row) {
  console.log(JSON.stringify(row));
}
// 选中项目发生变化时候的调用函数
function handleSelectionChange(val) {
  selections.value = val
}
// 切换选中状态
function toggleSelection(rows) {
  const table = waltablePagination.value?.table
  if (rows) {
    rows.forEach((row) => {
      table?.toggleRowSelection(row, undefined)
    })
  } else {
    table?.clearSelection()
  }
}
// 数据源
function fetchData() {
  setTimeout(() => {
    tableData.value = Array.from(new Array(pagination.pageSize), (item, index) => ({
      date: '2022-07-24',
      name: `victor`,
      address: `No. ${++index + pagination.pageSize*(pagination.currenPage-1)} , Grove St, Los Angeles`
    }))
  }, 1000)
}
onMounted(fetchData)
</script>
```

### WalTablePagination 属性以及事件

WalTablePagination 的属性 99.99% 对齐 element-plus 的 table 和 pagination 的属性以及事件。也就是说你平时写在table和pagination上的属性和方法统一可以写在 WalTablePagination 组件标签上了。

### 特别注意

由于table、pagination组件同时具有 current-change 事件。为了避免冲突改用 table-current-change 和 pagination-current-change 来分别代替对应的 current-change 事件。

| 事件 | 说明 |
| -- | -- |
| pagination-current-change | current-page 改变时触发 |
| table-current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 |


其他属性和事件的使用参照 [el-table](https://element-plus.gitee.io/zh-CN/component/table.html) 和 [el-pagination](https://element-plus.gitee.io/zh-CN/component/pagination.html)

如果您喜欢此插件麻烦帮我点个star，谢谢支持！

项目地址： [wal-table-pagination](https://github.com/JZH189/wal-table-pagination)
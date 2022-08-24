<template>
  <div style="text-align: center;">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换2，3项的选中状态</el-button>
    <el-button @click="toggleSelection()">清空所选</el-button>
  </div>
  <WalTablePagination
    style="width:800px;margin: 20px auto 0px;"
    ref="waltablePagination"
    :border="true"
    :max-height="500"
    :data="tableData"
    :total="pagination.total"
    :current-page="pagination.currentPage"
    @filter-change="handleFilterChange"
    @selection-change="handleSelectionChange"
    @size-change="handleSizeChange"
    @pagination-current-change="handlePaginationCurrentChange"
  >
    <el-table-column type="selection" fixed="left" width="80px" />
    <el-table-column prop="date" label="Date" min-width="200px" />
    <el-table-column prop="name" label="Name" min-width="200px" />
    <el-table-column prop="address" label="Address" min-width="300px">
      <el-table-column
              prop="director"
              column-key="director"
              :filters="[
                { text: 'John Lasseter', value: 'John Lasseter' },
                { text: 'Peter Docter', value: 'Peter Docter' },
                { text: 'Andrew Stanton', value: 'Andrew Stanton' }
              ]"
              :filter-method="filterMethod"
              label="导演" />
    </el-table-column>
    <el-table-column label="Operations" fixed="right" min-width="100px">
      <template #default="{ row }">
        <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
      </template>
    </el-table-column>
  </WalTablePagination>
</template>

<script setup>
import { ElButton, ElTableColumn, ElTable } from "element-plus";
import WalTablePagination from '../packages/wal-table-pagination/src/wal-table-pagination.vue'
import { reactive, ref, onMounted} from 'vue'
//WaltablePagination实例
const waltablePagination = ref()  
//选中的table项
const selections = ref([]) 
//table数据
const tableData = ref([])  
//分页配置
const pagination = reactive({
  currentPage: 1,
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
  pagination.currentPage = val
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
      address: `No. ${++index + pagination.pageSize*(pagination.currentPage-1)} , Grove St, Los Angeles`
    }))
  }, 1000)
}

function filterMethod(value, row) {
  return value === row.director
}
function handleFilterChange(filters) {
  this.filters = filters
}
onMounted(fetchData)
</script>
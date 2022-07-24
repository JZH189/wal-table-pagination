<template>
  <div style="text-align: center;">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])"
      >切换2，3项的选中状态</el-button
    >
    <el-button @click="toggleSelection()">清空所选</el-button>
  </div>
  <WaltablePagination
    ref="waltablePagination"
    border
    style="width:800px;margin: 20px auto 0px;"
    :max-height="500"
    :data="tableData"
    :total="pagination.total"
    @clearSelection="clearSelection"
    :current-page="pagination.currenPage"
    :page-size="pagination.pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    @select-change="handleSelectionChange"
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
import WaltablePagination from '@/components/WaltablePagination'
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
  console.log('pageSize: ', val);
  pagination.pageSize = val
  fetchData()
}
// currenPage变化
function handleCurrentChange(val) {
  console.log('currenPage', val);
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
  console.log('选中的内容', JSON.stringify(selections.value));
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
  }, 300)
}

onMounted(fetchData)


function clearSelection(){
  
}
</script>
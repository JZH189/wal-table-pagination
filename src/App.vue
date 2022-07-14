<template>
  <WaltablePagination
    :data="tableData"
    :total="pagination.total"
    :current-page="pagination.currentPage"
    :page-size="pagination.pageSize"
  >
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </WaltablePagination>
</template>

<script setup>
import WaltablePagination from '@/components/WaltablePagination'
import { reactive } from 'vue'

const pagination = reactive({
  currenPage: 1,
  pageSize: 20,
  total: 0
})
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
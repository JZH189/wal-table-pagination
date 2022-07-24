<template>
  <div>
    <el-table ref="table" v-bind="tableAttrs">
      <slots :key="key" />
    </el-table>
    <el-pagination v-if="props.showPagenation" v-bind="paginationAttrs" />
  </div>
</template>

<script>
import { defineComponent, computed, ref, readonly, watch } from 'vue'
export default defineComponent({
  name: 'WaltablePagination',
})
</script>

<script setup>
import { getTableAttrs, tableSlots, tableColumns, finalSlot } from './table'
import { getPaginationAttrs } from './pagination'
import { tableEvents, paginationEvents, useEmits } from './emits'

const emit = defineEmits([...tableEvents, ...paginationEvents])
useEmits(emit)
const props = defineProps({
    //是否展示分页
    showPagenation: {
      type: Boolean,
      default() {
        return true
      },
    },
    //分页设置
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 200]
      }
    },
    //表格原始数据
    data: {
      type: Array,
      required: true,
    },
    //当前页数
    currentPage: {
      type: Number,
      required: true,
    },
    //pageSize
    pageSize: {
      type: Number,
      required: true,
    },
    //总的分页条数
    total: {
      type: Number,
      required: true,
    },
  })
//获取table组件所需的attrs
const tableAttrs = getTableAttrs(props)
//获取pagination组件所需的attrs
const paginationAttrs = getPaginationAttrs(props)
//强制新表格列
const key = ref(0)
watch(finalSlot, () => (key.value += 1))
//向el-table传递插槽
const slots = () => [tableSlots.value.tableLeft, finalSlot.value, tableSlots.value.tableRight]
//暴露组件的方法
const table = ref()
defineExpose({
  // 提供访问 el-table 途径
  table,
  // 列的数据
  columns: computed(() => readonly(tableColumns.render)),
  // 更新列数据
  updateColumns(value) {
    tableColumns.storage = value
  },
})
</script>

<style scoped>
.el-pagination {
  margin: 10px 0px;
  display: flex;
  justify-content: flex-end;
}
</style>

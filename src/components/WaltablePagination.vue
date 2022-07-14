<template>
  <div>
    <el-table
      ref="table"
      :data="$attrs.data"
      :height="$attrs.height"
      :max-height="$attrs['max-height']"
      :stripe="$attrs.stripe"
      :border="$attrs.border"
      :fit="$attrs.fit"
      :show-header="$attrs.showHeader"
      @select="selectRow"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @row-dblclick="rowDblclick"
    >
      <children :key="key" />
    </el-table>
    <el-pagination
      v-if="showPagenation"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>

<script>
import { defineComponent, cloneVNode, computed, reactive, ref, readonly, useSlots, watch } from 'vue'
export default defineComponent({
  name: 'WaltablePagination',
})
</script>

<script setup>
const props = defineProps({
  showPagenation: {
    type: Boolean,
    default() {
      return true
    },
  },
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})
const defaults = useSlots().default?.()
function isElTableColumn(vnode) {
  return vnode.type?.name === 'ElTableColumn'
}
/* 对 slot 进行分类, 让table-column存在prop的列从左到右正常排列 */
const slots = computed(() => {
  const fixedLeft = [] //固定到左侧列
  const fixedRight = [] //固定到右侧列
  const selection = [] //存勾选列
  const contents = [] // 存prop的列,即内容列
  const options = [] // 操作列
  defaults?.forEach((vnode) => {
    if (isElTableColumn(vnode)) {
      //vnode.props就是用户传入的props
      const { prop, type, fixed } = vnode.props || {}
      if (fixed) {
        if (fixed === 'left') {
          return fixedLeft.push(vnode)
        } else if (fixed === 'right') {
          return fixedRight.push(vnode)
        }
      }
      // 存在 prop 属性，归为内容列
      if (prop !== undefined) {
        contents.push(vnode)
      } else if (type === 'selection') {
        selection.push(vnode)
      } else {
        // 不存在 prop 属性，归为操作列
        options.push(vnode)
      }
    }
  })
  return {
    fixedLeft,
    fixedRight,
    selection,
    contents,
    options,
  }
})
/* 收集筛选后的列数据 */
const columns = reactive({
  slot: computed(() =>
    slots.value.contents.map(({ props }) => ({
      prop: props.prop, // 列标识
      label: props.label, // 列名称
      visiable: props.visiable || true, // 是否可见
    })),
  ),
  storage: [],
  render: computed(() => {
    const slot = [...columns.slot]
    const storage = [...columns.storage]
    const result = []
    storage.forEach((props) => {
      const index = slot.findIndex(({ prop }) => prop === props.prop)
      if (index >= 0) {
        const propsFromSlot = slot[index]
        result.push({
          ...propsFromSlot, // 可能新增属性 所以用 slot 的数据兜底
          ...props,
        })
        slot.splice(index, 1) // storage 里不存在的列
      }
      // slot 中没有找到的则会被过滤掉
    })
    result.push(...slot)
    return result
  }),
})
/* 最终被呈现的slot */
const finalSlot = computed(() => {
  const { contents } = slots.value
  const result = []
  columns.render.forEach(({ prop, visiable }) => {
    // 如果visiable为false则不渲染
    if (!visiable) return
    // 从 slots.contents 中寻找对应 prop 的 VNode
    const vnode = contents.find((vnode) => prop === vnode.props?.prop)
    if (!vnode) return
    // 克隆 VNode 并修改部分属性
    const cloned = cloneVNode(vnode)
    result.push(cloned)
  })
  return result
})
//更新表格列
const key = ref(0)
watch(finalSlot, () => (key.value += 1))
/* 向el-table传递插槽 */
const children = () => [slots.value.fixedLeft, slots.value.selection, finalSlot.value, slots.value.options, slots.value.fixedRight]
/* 定义emits */
const emit = defineEmits(['select', 'select-all', 'select-change', 'row-dblclick', 'size-change', 'current-change'])
//当用户手动勾选数据行的 Checkbox 时触发的事件
const selectRow = (val) => {
  emit('select', val)
}
//当用户手动勾选全选 Checkbox 时触发的事件
const selectAll = (val) => {
  emit('select-all', val)
}
//当选择项发生变化时会触发该事件
const selectionChange = (val) => {
  emit('select-change', val)
}
//当某一行被双击时会触发该事件
const rowDblclick = (val) => {
  emit('row-dblclick', val)
}
/**
 * 分页设置
 */
const pageSizes = ref([20, 50, 100, 200]) // 分页设置
//pagination, pageSize、currentPage 改变时触发
watch(
  () => props.pageSize,
  (newVal) => {
    emit('size-change', newVal)
  },
)
watch(
  () => props.currentPage,
  (newVal) => {
    emit('current-change', newVal)
  },
)
/*组件暴露的方法*/
const table = ref()
defineExpose({
  // 提供访问 el-table 途径
  table,
  // 列的数据
  columns: computed(() => readonly(columns.render)),
  // 更新列数据
  updateColumns(value) {
    columns.storage = value
  },
})
</script>

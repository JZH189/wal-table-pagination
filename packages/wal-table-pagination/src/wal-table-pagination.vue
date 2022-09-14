<template>
  <div>
    <el-table 
      ref="table" 
      v-bind="tableAttrs"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click="cellClick"
      @cell-dblclick="cellDblclick"
      @cell-contextmenu="cellContextmenu"
      @row-click="rowClick"
      @row-contextmenu="rowContextmenu"
      @row-dblclick="rowDblclick"
      @header-click="headerClick"
      @header-contextmenu="headerContextmenu"
      @sort-change="sortChange"
      @filter-change="filterChange"
      @current-change="tableCurrentChange"
      @header-dragend="headerDragend"
      @expand-change="expandChange"
    >
      <column :key="key" />
    </el-table>
    <el-pagination 
      v-bind="paginationAttrs" 
      @size-change="sizeChange"
      @current-change="paginationCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    />
  </div>
</template>

<script>
import { defineComponent, computed, ref, readonly, watch, useAttrs, useSlots, reactive, cloneVNode } from 'vue'
export default defineComponent({
  name: 'WalTablePagination',
})
</script>

<script setup>
import { ElTable, ElPagination } from 'element-plus'
function getTableAttrs(props, attrs) {
  return computed(() => ({
    data: props?.data, //显示的数据
    height: attrs?.height, //Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
    "max-height": attrs?.["max-height"], //Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
    stripe: attrs?.stripe, //是否为斑马纹 table
    border: attrs?.border, //是否带有纵向边框
    size: attrs?.size, //Table 的尺寸
    fit: attrs?.fit, //列的宽度是否自撑开
    "show-header": attrs?.["show-header"], //是否显示表头
    "highlight-current-row": attrs?.["highlight-current-row"], //是否要高亮当前行
    "current-row-key": attrs?.["current-row-key"], //当前行的 key，只写属性
    "row-class-name": attrs?.["row-class-name"], //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    "row-style": attrs?.["row-style"], //行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
    "cell-class-name": attrs?.["cell-class-name"], //单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
    "cell-style": attrs?.["cell-style"], //单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
    "header-row-class-name": attrs?.["header-row-class-name"], //表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
    "header-row-style": attrs?.["header-row-style"], //表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
    "header-cell-class-name": attrs?.["header-cell-class-name"], //表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
    "header-cell-style": attrs?.["header-cell-style"], //表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
    "row-key": attrs?.["row-key"], //行数据的 Key，用来优化 Table 的渲染； 在使用reserve-selection功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
    "empty-text": attrs?.["empty-text"], //空数据时显示的文本内容， 也可以通过 #empty 设置
    "default-expand-all": attrs?.["default-expand-all"], //是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    "expand-row-keys": attrs?.["expand-row-keys"], //可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
    "default-sort": attrs?.["default-sort"], //默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序
    "tooltip-effect": attrs?.["tooltip-effect"], //tooltip effect 属性
    "show-summary": attrs?.["show-summary"], //是否在表尾显示合计行
    "sum-text": attrs?.["sum-text"], //合计行第一列的文本
    "summary-method": attrs?.["summary-method"], //自定义的合计计算方法
    "span-method": attrs?.["span-method"], //合并行或列的计算方法
    "select-on-indeterminate": attrs?.["select-on-indeterminate"], //在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行
    indent: attrs?.indent, //展示树形数据时，树节点的缩进
    lazy: attrs?.lazy, //是否懒加载子节点数据
    load: attrs?.load, //加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
    "tree-props": attrs?.["tree-props"], //渲染嵌套数据的配置选项
    "table-layout": attrs?.["table-layout"], //设置表格单元、行和列的布局方式
    "scrollbar-always-on": attrs?.["scrollbar-always-on"], //总是显示滚动条
    flexible: attrs?.flexible, //确保主轴的最小尺寸
  }));
}
function isElTableColumn(vnode) {
  return vnode.type?.name === "ElTableColumn";
}
function getPaginationAttrs(props, attrs) {
  return computed(() => ({
    small: attrs?.small, //是否使用小型分页样式
    background: attrs?.background, //是否为分页按钮添加背景色
    "page-size": props?.pageSize, //每页显示条目个数，支持 v-model 双向绑定
    "default-page-size": attrs?.["default-page-size"], //每页显示条目数的初始值
    total: props?.total, //总条目数
    "page-count": attrs?.["page-count"], //总页数 total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
    "pager-count": attrs?.["pager-count"], //设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
    "current-page": props?.currentPage, //当前页数，支持 v-model 双向绑定
    "default-current-page": attrs?.["default-current-page"], //当前页数的初始值
    layout: attrs?.layout || "total, sizes, prev, pager, next, jumper", //组件布局，子组件名用逗号分隔
    "page-sizes": props?.pageSizes, //每页显示个数选择器的选项设置
    "popper-class": attrs?.["popper-class"], //每页显示个数选择器的下拉框类名
    "prev-text": attrs?.["prev-text"], //替代图标显示的上一页文字
    "next-text": attrs?.["next-text"], //替代图标显示的下一页文字
    disabled: attrs?.disabled, //是否禁用分页
    "hide-on-single-page": attrs?.["hide-on-single-page"], //只有一页时是否隐藏
  }));
}
const attrs = useAttrs()
const props = defineProps({
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
      required: false,
    },
    //总的分页条数
    total: {
      type: Number,
      required: true,
    },
})
//获取table组件所需的attrs
const tableAttrs = getTableAttrs(props, attrs)
//获取pagination组件所需的attrs
const paginationAttrs = getPaginationAttrs(props, attrs)
/**
 * 对 slot 进行分类, 让table-column在table中从左到右排列
 * 此时要考虑以下几种情况：
 * 1、Table-column定义了fixed：left 属性的列需要固定列到table的最左边
 * 2、Table-column定义了fixed：right 属性的列需要固定列到table的最右边
 * 3、剩下的就是按照先后顺序从左到右排列
 */
const tableSlots = computed(() => {
  const defaults = useSlots().default?.();
  const tableLeft = []; //固定到左侧列
  const tableRight = []; //固定到右侧列
  const contents = []; // 存内容列
  defaults?.forEach((vnode) => {
    if (isElTableColumn(vnode)) {
      //vnode.props就是用户传入的props
      const { fixed } = vnode.props || {};
      if (fixed) {
        if (fixed === "left") {
          return tableLeft.push(vnode);
        } else if (fixed === "right") {
          return tableRight.push(vnode);
        }
      } else {
        return contents.push(vnode);
      }
    }
  });
  return {
    tableLeft,
    tableRight,
    contents,
  };
});
// 收集筛选后的列数据
const tableColumns = reactive({
  slot: computed(() =>
    tableSlots.value.contents.map(({ props }) => ({
      prop: props.prop, // 列标识
      label: props.label, // 列名称
      visiable: props.visiable || true, // 是否可见
    }))
  ),
  storage: [],
  render: computed(() => {
    const slot = [...tableColumns.slot];
    const storage = [...tableColumns.storage];
    const result = [];
    storage.forEach((props) => {
      const index = slot.findIndex(({ prop }) => prop === props.prop);
      if (index >= 0) {
        const propsFromSlot = slot[index];
        result.push({
          ...propsFromSlot, // 可能新增属性 所以用 slot 的数据兜底
          ...props,
        });
        slot.splice(index, 1); // storage 里不存在的列
      }
      // slot 中没有找到的则会被过滤掉
    });
    result.push(...slot);
    return result;
  }),
});
// 最终被呈现的slot
const finalSlot = computed(() => {
  const { contents } = tableSlots.value;
  const result = [];
  tableColumns.render.forEach(({ prop, visiable }) => {
    // 如果visiable为false则不渲染
    if (!visiable) return;
    // 从 slots.contents 中寻找对应 prop 的 VNode
    const vnode = contents.find((vnode) => prop === vnode.props?.prop);
    if (!vnode) return;
    // 克隆 VNode 并修改部分属性
    const cloned = cloneVNode(vnode);
    result.push(cloned);
  });
  return result;
});
//强制新表格列
const key = ref(0)
watch(finalSlot, () => (key.value += 1))
//向el-table传递插槽
const column = () => [tableSlots.value.tableLeft, finalSlot.value, tableSlots.value.tableRight]
const emit = defineEmits([
  "select",
  "select-all",
  "selection-change",
  "cell-mouse-enter",
  "cell-mouse-leave",
  "cell-click",
  "cell-dblclick",
  "cell-contextmenu",
  "row-click",
  "row-contextmenu",
  "row-dblclick",
  "header-click",
  "header-contextmenu",
  "sort-change",
  "filter-change",
  "table-current-change",
  "header-dragend",
  "expand-change",
  "size-change", 
  "pagination-current-change", 
  "prev-click", 
  "next-click"
])
// pagination事件emit
function sizeChange(val) {
  emit('size-change', val);
}
function paginationCurrentChange(val) {
  emit('pagination-current-change', val);  
}
function prevClick(val) {
  emit('prev-click', val);
}
function nextClick(val) {
  emit('next-click', val)
}
// table 事件emit
function select(...agrs) {
  emit('select', ...agrs)
}
function selectAll(...agrs) {
  emit('select-all', ...agrs)
}
function selectionChange(...agrs) {
  emit('selection-change', ...agrs)
}
function cellMouseEnter(...agrs) {
  emit('cell-mouse-enter', ...agrs)
}
function cellMouseLeave(...agrs) {
  emit('cell-mouse-leave', ...agrs)
}
function cellClick(...agrs) {
  emit('cell-click', ...agrs)
}
function cellDblclick(...agrs) {
  emit('cell-dblclick', ...agrs)
}
function cellContextmenu(...agrs) {
  emit('cell-contextmenu', ...agrs)
}
function rowClick(...agrs) {
  emit('row-click', ...agrs)
}
function rowContextmenu(...agrs) {
  emit('row-contextmenu', ...agrs)
}
function rowDblclick(...agrs) {
  emit('row-dblclick', ...agrs)
}
function headerClick(...agrs) {
  emit('header-click', ...agrs)
}
function headerContextmenu(...agrs) {
  emit('header-contextmenu', ...agrs)
}
function sortChange(...agrs) {
  emit('sort-change', ...agrs)
}
function filterChange(...agrs) {
  emit('filter-change', ...agrs)
}
function tableCurrentChange(...agrs) {
  emit('table-current-change', ...agrs)
}
function headerDragend(...agrs) {
  emit('header-dragend', ...agrs)
}
function expandChange(...agrs) {
  emit('expand-change', ...agrs)
}
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
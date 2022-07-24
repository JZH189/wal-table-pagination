import { useAttrs, useSlots, computed, reactive, cloneVNode } from "vue";

function getTableAttrs(props) {
  const attrs = useAttrs()
  console.log('attrs: ', attrs);
  const maxHeight = 'max-height'
  const showHeader = 'show-header'
  const highlightCurrentRow = 'highlight-current-row'
  const currentRowKey = 'current-row-key'
  const rowClassName = 'row-class-name'
  const rowStyle = 'row-class-name'
  const cellClassName = 'cell-class-name'
  const cellStyle = 'cell-style'
  const headerRowClassName = 'header-row-class-name'
  const headerRowStyle = 'header-row-style'
  const headerCellClassName = 'header-cell-class-name'
  const headerCellStyle = 'header-cell-style'
  const rowKey = 'row-key'
  const emptyText = 'empty-text'
  const defaultExpandAll = 'default-expand-all'
  const expandRowKeys = 'expand-row-keys'
  const defaultSort = 'default-sort'
  const tooltipEffect = 'tooltip-effect'
  const showSummary = 'show-summary'
  const sumText = 'sum-text'
  const summaryMethod = 'summary-method'
  const spanMethod = 'span-method'
  const selectOnIndeterminate = 'select-on-indeterminate'
  const treeProps = 'tree-props'
  const tableLayout = 'table-layout'
  const scrollbarAlwaysOn = 'scrollbar-always-on'
  const selectAll = 'select-all'
  const selectionChange = 'selection-change'
  const cellMouseEnter = 'cell-mouse-enter'
  const cellMouseLeave = 'cell-mouse-leave'
  const cellClick = 'cell-click'
  const cellDblclick = 'cell-dblclick'
  const cellContextmenu = 'cell-contextmenu'
  const rowClick = 'row-click'
  const rowContextmenu = 'row-contextmenu'
  const rowDblclick = 'row-dblclick'
  const headerClick = 'header-click'
  const headerContextmenu = 'header-contextmenu'
  const sortChange = 'sort-change'
  const filterChange = 'filter-change'
  const currentChange = 'current-change'
  const headerDragend = 'header-dragend'
  const expandChange = 'expand-change'
  return computed(() => ({
    data: props?.data,  //显示的数据
    height: attrs?.height, //Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
    [maxHeight]: attrs?.[maxHeight], //Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
    stripe: attrs?.stripe, //是否为斑马纹 table
    border: attrs?.border, //是否带有纵向边框
    size: attrs?.size, //Table 的尺寸
    fit: attrs?.fit, //列的宽度是否自撑开
    [showHeader]: attrs?.[showHeader],  //是否显示表头
    [highlightCurrentRow]: attrs?.[highlightCurrentRow], //是否要高亮当前行
    [currentRowKey]: attrs?.[currentRowKey], //当前行的 key，只写属性
    [rowClassName]: attrs?.[rowClassName], //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    [rowStyle]: attrs?.[rowStyle],  //行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
    [cellClassName]: attrs?.[cellClassName],  //单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
    [cellStyle]: attrs?.[cellStyle],  //单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
    [headerRowClassName]: attrs?.[headerRowClassName], //表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
    [headerRowStyle]: attrs?.[headerRowStyle], //表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
    [headerCellClassName]: attrs?.[headerCellClassName], //表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
    [headerCellStyle]: attrs?.[headerCellStyle], //表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
    [rowKey]: attrs?.[rowKey], //行数据的 Key，用来优化 Table 的渲染； 在使用reserve-selection功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
    [emptyText]: attrs?.[emptyText],  //空数据时显示的文本内容， 也可以通过 #empty 设置
    [defaultExpandAll]: attrs?.[defaultExpandAll], //是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    [expandRowKeys]: attrs?.[expandRowKeys], //可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
    [defaultSort]: attrs?.[defaultSort], //默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序
    [tooltipEffect]: attrs?.[tooltipEffect], //tooltip effect 属性
    [showSummary]: attrs?.[showSummary],  //是否在表尾显示合计行
    [sumText]: attrs?.[sumText],  //合计行第一列的文本
    [summaryMethod]: attrs?.[summaryMethod],  //自定义的合计计算方法
    [spanMethod]: attrs?.[spanMethod], //合并行或列的计算方法
    [selectOnIndeterminate]: attrs?.[selectOnIndeterminate], //在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行
    indent: attrs?.indent, //展示树形数据时，树节点的缩进
    lazy: attrs?.lazy, //是否懒加载子节点数据
    load: attrs?.load, //加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
    [treeProps]: attrs?.[treeProps], //渲染嵌套数据的配置选项
    [tableLayout]: attrs?.[tableLayout], //设置表格单元、行和列的布局方式
    [scrollbarAlwaysOn]: attrs?.[scrollbarAlwaysOn], //总是显示滚动条
    flexible: attrs?.flexible,  //确保主轴的最小尺寸
    select: attrs?.select, //当用户手动勾选数据行的 Checkbox 时触发的事件
    [selectAll]: attrs?.[selectAll], //当用户手动勾选全选 Checkbox 时触发的事件
    [selectionChange]: attrs?.[selectionChange], //当选择项发生变化时会触发该事件
    [cellMouseEnter]: attrs?.[cellMouseEnter],  //当单元格 hover 进入时会触发该事件
    [cellMouseLeave]: attrs?.[cellMouseLeave], //当单元格 hover 退出时会触发该事件
    [cellClick]: attrs?.[cellClick], //当某个单元格被点击时会触发该事件
    [cellDblclick]: attrs?.[cellDblclick], //当某个单元格被双击击时会触发该事件
    [cellContextmenu]: attrs?.[cellContextmenu], //当某个单元格被鼠标右键点击时会触发该事件
    [rowClick]: attrs?.[rowClick], //当某一行被点击时会触发该事件
    [rowContextmenu]: attrs?.[rowContextmenu], //当某一行被鼠标右键点击时会触发该事件
    [rowDblclick]: attrs?.[rowDblclick], //当某一行被双击时会触发该事件
    [headerClick]: attrs?.[headerClick], //当某一列的表头被点击时会触发该事件
    [headerContextmenu]: attrs?.[headerContextmenu], //当某一列的表头被鼠标右键点击时触发该事件
    [sortChange]: attrs?.[sortChange], //当表格的排序条件发生变化的时候会触发该事件
    [filterChange]: attrs?.[filterChange],  //column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
    [currentChange]: attrs?.[currentChange], //当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
    [headerDragend]: attrs?.[headerDragend], //当拖动表头改变了列的宽度的时候会触发该事件
    [expandChange]: attrs?.[expandChange], //当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）
  }))
}
function isElTableColumn(vnode) {
  return vnode.type?.name === 'ElTableColumn'
}
/**
 * 对 slot 进行分类, 让table-column在table中从左到右排列 
 * 此时要考虑以下几种情况：
 * 1、Table-column定义了fixed：left 属性的列需要固定列到table的最左边
 * 2、Table-column定义了fixed：right 属性的列需要固定列到table的最右边
 * 3、剩下的就是按照先后顺序从左到右排列
 */
 const tableSlots = computed(() => {
  const defaults = useSlots().default?.()
  const tableLeft = []  //固定到左侧列
  const tableRight = [] //固定到右侧列
  const contents = []   // 存内容列
  defaults?.forEach((vnode) => {
    if (isElTableColumn(vnode)) {
      //vnode.props就是用户传入的props
      const { fixed } = vnode.props || {}
      if (fixed) {
        if (fixed === 'left') {
          return tableLeft.push(vnode)
        } else if (fixed === 'right') {
          return tableRight.push(vnode)
        }
      } else {
        return contents.push(vnode)
      }
    }
  })
  return {
    tableLeft,
    tableRight,
    contents,
  }
})
// 收集筛选后的列数据
const tableColumns = reactive({
  slot: computed(() =>
    tableSlots.value.contents.map(({ props }) => ({
      prop: props.prop, // 列标识
      label: props.label, // 列名称
      visiable: props.visiable || true, // 是否可见
    })),
  ),
  storage: [],
  render: computed(() => {
    const slot = [...tableColumns.slot]
    const storage = [...tableColumns.storage]
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
// 最终被呈现的slot
const finalSlot = computed(() => {
  const { contents } = tableSlots.value
  const result = []
  tableColumns.render.forEach(({ prop, visiable }) => {
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
export { getTableAttrs, tableSlots, tableColumns, finalSlot }
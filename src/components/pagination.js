import { useAttrs, computed } from "vue";

function getPaginationAttrs(props) {
  const attrs = useAttrs()
  const pageSize = 'page-size'
  const defaultPageSize = 'default-page-size'
  const pageCount = 'page-count'
  const pagerCount = 'pager-count'
  const currentPage = 'current-page'
  const defaultCurrentPage = 'default-current-page'
  const pageSizes = 'page-sizes'
  const popperClass = 'popper-class'
  const prevText = 'prev-text'
  const nextText = 'next-text'
  const hideOnSinglePage = 'hide-on-single-page'
  const sizeChange = 'size-change'
  const currentChange = 'current-change'
  const prevClick = 'prev-click'
  const nextClick = 'next-click'
  return computed(() => ({
    small: attrs?.small,  //是否使用小型分页样式
    background: attrs?.background,  //是否为分页按钮添加背景色
    [pageSize]: attrs?.[pageSize], //每页显示条目个数，支持 v-model 双向绑定
    [defaultPageSize]: attrs?.[defaultPageSize], //每页显示条目数的初始值
    total: props?.total, //总条目数
    [pageSizes]: props?.pageSizes, //每页显示个数选择器的选项设置
    [pageCount]: attrs?.[pageCount],  //总页数 total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
    [pagerCount]: attrs?.[pagerCount], //设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
    [currentPage]: attrs?.[currentPage], //当前页数，支持 v-model 双向绑定
    [defaultCurrentPage]: attrs?.[defaultCurrentPage], //当前页数的初始值
    layout: attrs?.layout || "total, sizes, prev, pager, next, jumper", //组件布局，子组件名用逗号分隔
    [popperClass]: attrs?.[popperClass], //每页显示个数选择器的下拉框类名
    [prevText]: attrs?.[prevText], //替代图标显示的上一页文字
    [nextText]: attrs?.[nextText], //替代图标显示的下一页文字
    disabled: attrs?.disabled, //是否禁用分页
    [hideOnSinglePage]: attrs?.[hideOnSinglePage], //只有一页时是否隐藏
    [sizeChange]: attrs?.[sizeChange], //pageSize 改变时触发
    [currentChange]: attrs?.[currentChange], //current-change 改变时触发
    [prevClick]: attrs?.[prevClick], //用户点击上一页按钮改变当前页时触发
    [nextClick]: attrs?.[nextClick], //用户点击下一页按钮改变当前页时触发
  }))
}

export { getPaginationAttrs } 
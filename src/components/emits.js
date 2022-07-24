
const paginationEvents = ['update:size-change', 'update:current-change', 'update:prev-click', 'update:next-click']
const tableEvents = [
  'update:select', 
  'update:select-all', 
  'update:selection-change', 
  'update:cell-mouse-enter', 
  'update:cell-mouse-leave', 
  'update:cell-click', 
  'update:cell-dblclick', 
  'update:cell-contextmenu', 
  'update:row-click', 
  'update:row-contextmenu',
  'update:row-dblclick',
  'update:header-click',
  'update:header-contextmenu',
  'update:sort-change',
  'update:filter-change',
  'update:current-change',
  'update:header-dragend',
  'update:expand-change'
]
function useEmits(emitObj) {
  
}
export { paginationEvents, tableEvents, useEmits }
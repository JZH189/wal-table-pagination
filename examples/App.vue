<template>
  <WalTablePagination :data="tableData" :total="3" :current-page="1" max-height="134">
    <el-table-column label="复选框">
      <template #default="{ row }">
        <el-checkbox-group v-model="row.checkList">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
        </el-checkbox-group>
      </template>
    </el-table-column>
  </WalTablePagination>
</template>

<script setup>
import { 
  ElButton, 
  ElTableColumn,
  ElCheckboxGroup,
  ElCheckbox
} from "element-plus";
import WalTablePagination from '../packages/wal-table-pagination/src/wal-table-pagination.vue'
import { reactive, ref, onMounted} from 'vue'
const tableData = [
  {
    checkList: [],
  },
  {
    checkList: ["复选框 A"],
  },
  {
    checkList: ["复选框 A", "复选框 B"],
  },
]
</script>
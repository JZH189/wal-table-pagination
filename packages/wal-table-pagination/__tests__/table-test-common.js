import { nextTick } from "vue";
//分页配置
const pagination = {
  currentPage: 1,
  pageSize: 10,
  total: 200,
};
function getTestData() {
  return Array.from(new Array(pagination.pageSize), (item, index) => ({
    date: '2022-07-24',
    name: `victor`,
    address: `No. ${++index + pagination.pageSize*(pagination.currentPage-1)} , Grove St, Los Angeles`
  }))
}
async function doubleWait() {
  await nextTick();
  await nextTick();
}
export { pagination, getTestData, doubleWait };

import WalTablePagination from "./src/wal-table-pagination.vue";
WalTablePagination.install = function (app) {
  app.component(WalTablePagination.name, WalTablePagination);
};

export default WalTablePagination;

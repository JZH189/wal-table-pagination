import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import WalTablePagination from "../src/wal-table-pagination.vue";
import { ElTableColumn, ElCheckboxGroup, ElCheckbox } from "element-plus";
import { pagination, getTestData, doubleWait } from "./table-test-common";
import triggerEvent from "./trigger-event";

const assertElementsExists = (wrapper, selectors, exists) => {
  selectors.forEach((selector) => {
    expect(wrapper.find(selector).exists()).toBe(exists);
  });
};

describe("wal-table-pagination.vue", () => {
  describe("render correct data", () => {
    const wrapper = mount({
      components: {
        ElTableColumn,
        WalTablePagination,
      },
      template: `
        <wal-table-pagination :data="tableData" :total="total" :current-page="currentPage">
          <el-table-column label="Date" prop="date" />
          <el-table-column label="Name" prop="name" />
          <el-table-column label="Address">
            <template #default="{ row }">
              <div>{{row.address}}</div>
            </template>
          </el-table-column>
        </wal-table-pagination>
      `,
      created() {
        this.tableData = getTestData();
        this.total = pagination.total;
        this.currentPage = pagination.currentPage;
      },
    });
    it("head title", async () => {
      await doubleWait();
      const ths = wrapper.findAll("thead th");
      const nodeTexts = ths.map((node) => node.text());
      expect(nodeTexts.filter((o) => o)).toEqual(["Date", "Name", "Address"]);
    });
    it("row length", () => {
      expect(
        wrapper.findAll(".el-table__body-wrapper tbody tr").length
      ).toEqual(getTestData().length);
    });
    it("row data", () => {
      const cellTexts = wrapper.findAll("td .cell").map((node) => node.text());
      const dataArrTexts = getTestData().flatMap((cur) => {
        return Object.values(cur).map(String);
      });
      expect(cellTexts).toStrictEqual(dataArrTexts);
      wrapper.unmount();
    });
    it("pagination exists", () => {
      assertElementsExists(wrapper, [".el-pagination"], true);
      expect(wrapper.find(".el-pagination__total").text()).toBe("Total 200");
      expect(wrapper.find(".el-pager .is-active").text()).toBe("1");
      wrapper.unmount();
    });
  });
  it("custom template", async () => {
    const wrapper = mount({
      components: {
        WalTablePagination,
        ElTableColumn,
        ElCheckboxGroup,
        ElCheckbox,
      },
      template: `
      <wal-table-pagination :data="tableData" :total="3" :current-page="1">
        <el-table-column label="复选框">
          <template #default="{ row }">
            <el-checkbox-group v-model="row.checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </wal-table-pagination>
      `,
      data() {
        return {
          tableData: [
            {
              checkList: [],
            },
            {
              checkList: ["复选框 A"],
            },
            {
              checkList: ["复选框 A", "复选框 B"],
            },
          ],
        };
      },
    });
    const vm = wrapper.vm;
    // await nextTick(); //一个nextTick还无法等待dom完全被更新所以此处使用两个await等待
    await doubleWait();
    const checkGroup = vm.$el.querySelectorAll(
      ".el-table__body-wrapper .el-checkbox-group"
    );
    expect(checkGroup.length).toBe(3);
    const checkbox = vm.$el.querySelectorAll(
      ".el-table__body-wrapper .el-checkbox"
    );
    expect(checkbox.length).toBe(6);
    const checkSelect = vm.$el.querySelectorAll(
      ".el-table__body-wrapper label.is-checked"
    );
    expect(checkSelect.length).toBe(3);
  });
  describe("table attributes", () => {
    const createTable = function (props, opts) {
      return mount({
        components: {
          ElTableColumn,
          WalTablePagination,
        },
        template: `
            <wal-table-pagination :data="tableData" :total="3" :current-page="1" ${props}>
              <el-table-column prop="date" label="date" />
              <el-table-column prop="name" label="name" />
              <el-table-column prop="Address" label="Address" />
            </wal-table-pagination>
          `,
        created() {
          this.tableData = getTestData();
        },
        ...opts,
      });
    };

    it("height", async () => {
      const wrapper = createTable('height="250"');
      await doubleWait();
      expect(wrapper.find(".el-table").attributes("style")).toContain(
        "height: 250px"
      );
      wrapper.unmount();
    });

    it("height as string", async () => {
      const wrapper = createTable('height="100px"');
      await doubleWait();
      expect(wrapper.find(".el-table").attributes("style")).toContain(
        "height: 100px"
      );
      wrapper.unmount();
    });

    it("maxHeight", async () => {
      const wrapper = createTable('max-height="134"');
      await doubleWait();
      expect(
        wrapper.find(".el-table__inner-wrapper").attributes("style")
      ).toContain("max-height: 134px");
      wrapper.unmount();
    });

    it("maxHeight uses vh units", async () => {
      const wrapper = createTable('max-height="60vh"');
      await doubleWait();
      const tableWraper = wrapper.find(".el-table");
      expect(
        tableWraper.find(".el-scrollbar__wrap").attributes("style")
      ).toContain("max-height: calc(60vh - 0px);");
      wrapper.unmount();
    });

    it("stripe", async () => {
      const wrapper = createTable("stripe");
      await doubleWait();
      expect(wrapper.find(".el-table").classes()).toContain(
        "el-table--striped"
      );
      wrapper.unmount();
    });

    it("border", async () => {
      const wrapper = createTable("border");
      await doubleWait();
      expect(wrapper.find(".el-table").classes()).toContain("el-table--border");
      wrapper.unmount();
    });

    it("fit", async () => {
      const wrapper = createTable(':fit="false"');
      await doubleWait();
      expect(wrapper.find(".el-table").classes()).not.toContain(
        "el-table--fit"
      );
      wrapper.unmount();
    });

    it("show-header", async () => {
      const wrapper = createTable(':show-header="false"');
      await doubleWait();
      expect(
        wrapper.find(".el-table").findAll(".el-table__header-wrapper").length
      ).toEqual(0);
      wrapper.unmount();
    });

    it("tableRowClassName", async () => {
      const wrapper = createTable(':row-class-name="tableRowClassName"', {
        methods: {
          tableRowClassName({ rowIndex }) {
            if (rowIndex === 1) {
              return "info-row";
            } else if (rowIndex === 3) {
              return "positive-row";
            }
            return "";
          },
        },
      });
      await doubleWait();
      expect(wrapper.find(".el-table").findAll(".info-row").length).toEqual(1);
      expect(wrapper.find(".el-table").findAll(".positive-row").length).toEqual(
        1
      );
      wrapper.unmount();
    });

    it("tableRowStyle[Object]", async () => {
      const wrapper = createTable(":row-style=\"{ height: '60px' }\"", {});
      await doubleWait();
      expect(
        wrapper.find(".el-table").find(".el-table__body tr").attributes("style")
      ).toContain("height: 60px");
      wrapper.unmount();
    });

    it("tableRowStyle[Function]", async () => {
      const wrapper = createTable(':row-style="tableRowStyle"', {
        methods: {
          tableRowStyle({ rowIndex }) {
            if (rowIndex === 1) {
              return { height: "60px", display: "none" };
            }
            return null;
          },
        },
      });
      await doubleWait();
      const child1 = wrapper
        .find(".el-table")
        .find(".el-table__body tr:nth-child(1)");
      const child2 = wrapper
        .find(".el-table")
        .find(".el-table__body tr:nth-child(2)");
      expect(child1.attributes("style")).toBeUndefined();
      expect(child2.attributes("style")).toContain("height: 60px");
      expect(child2.attributes("style")).toContain("display: none");
      wrapper.unmount();
    });

    it.fails("current-row-key", async () => {
      //此项不通过，官方的el-table组件也是不通过。。。
      const wrapper = mount({
        components: {
          ElTableColumn,
          WalTablePagination,
        },
        template: `
          <WalTablePagination :total="200" :current-page="1" :data="testData" highlight-current-row :current-row-key="currentRowKey">
            <el-table-column prop="name" label="name" />
            <el-table-column prop="date" label="date" />
            <el-table-column prop="address" label="address" />
          </WalTablePagination>
        `,
        created() {
          this.testData = getTestData();
        },
        data() {
          return { currentRowKey: null };
        },
      });
      await doubleWait();
      wrapper.vm.currentRowKey = 1;
      const tr = wrapper.find(".el-table__body tr");
      await doubleWait();
      expect(tr.classes()).toContain("current-row");
      wrapper.vm.currentRowKey = 2;
      const rows = wrapper.findAll(".el-table__body-wrapper tbody tr");
      await doubleWait();
      expect(tr.classes()).not.toContain("current-row");
      expect(rows[1].classes()).toContain("current-row");
      wrapper.unmount();
    });
  });
  describe("filter", async () => {
    let wrapper = null;
    beforeEach(async () => {
      wrapper = mount({
        components: {
          ElTableColumn,
          WalTablePagination,
        },
        template: `
        <wal-table-pagination :total="200" :current-page="1" :data="testData" @filter-change="handleFilterChange">
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column
            prop="address"
            column-key="address"
            :filters="[
              { text: 'No. 1 , Grove St, Los Angeles', value: 'No. 1 , Grove St, Los Angeles' },
              { text: 'No. 2 , Grove St, Los Angeles', value: 'No. 2 , Grove St, Los Angeles' },
              { text: 'No. 3 , Grove St, Los Angeles', value: 'No. 3 , Grove St, Los Angeles' }
            ]"
            :filter-method="filterMethod"
            min-width="300px"
            label="Address" />
        </wal-table-pagination>
        `,
        created() {
          this.testData = getTestData();
        },
        methods: {
          filterMethod(value, row) {
            return value === row.address;
          },
          handleFilterChange(filters) {
            this.filters = filters;
          },
        },
      });
    });
    await doubleWait();

    afterEach(() => wrapper.unmount());

    it("render", () => {
      expect(
        wrapper.find(".el-table__column-filter-trigger")
      ).not.toBeUndefined();
    });

    it("click dropdown", async () => {
      const btn = wrapper.find(".el-table__column-filter-trigger");
      btn.trigger("click");
      await doubleWait();
      const filter = document.body.querySelector(".el-table-filter");
      expect(filter).toBeDefined();
      filter.parentNode.removeChild(filter);
    });

    it("click filter", async () => {
      const btn = wrapper.find(".el-table__column-filter-trigger");
      btn.trigger("click");
      await doubleWait();
      const filter = document.body.querySelector(".el-table-filter");
      triggerEvent(filter.querySelector(".el-checkbox"), "click", true, false);
      // confrim button
      await doubleWait();
      triggerEvent(
        filter.querySelector(".el-table-filter__bottom button"),
        "click",
        true,
        false
      );
      await doubleWait();
      expect(wrapper.vm.filters["address"]).toEqual([
        "No. 1 , Grove St, Los Angeles",
      ]);
      expect(
        wrapper.findAll(".el-table__body-wrapper tbody tr").length
      ).toEqual(1);
      filter.parentNode.removeChild(filter);
    });

    it("clear filter", async () => {
      const btn = wrapper.find(".el-table__column-filter-trigger");
      btn.trigger("click");
      await doubleWait();
      const filter = document.body.querySelector(".el-table-filter");
      triggerEvent(filter.querySelector(".el-checkbox"), "click", true, false);
      // confrim button
      await doubleWait();
      triggerEvent(
        filter.querySelector(".el-table-filter__bottom button"),
        "click",
        true,
        false
      );
      await doubleWait();
      expect(
        wrapper.findAll(".el-table__body-wrapper tbody tr").length
      ).toEqual(1);
      const table = wrapper.findComponent(".el-table");
      table.componentVM.clearFilter();
      await doubleWait();
      expect(
        wrapper.findAll(".el-table__body-wrapper tbody tr").length
      ).toEqual(10);
      filter.parentNode.removeChild(filter);
    });

    it("click reset", async () => {
      const btn = wrapper.find(".el-table__column-filter-trigger");
      btn.trigger("click");
      await doubleWait();
      const filter = document.body.querySelector(".el-table-filter");
      triggerEvent(filter.querySelector(".el-checkbox"), "click", true, false);
      await doubleWait();
      triggerEvent(
        filter.querySelectorAll(".el-table-filter__bottom button")[1],
        "click",
        true,
        false
      );
      await doubleWait();
      expect(wrapper.vm.filters["address"]).toEqual([]);
      expect([
        ...filter.querySelector(".el-table-filter__bottom button").classList,
      ]).toContain("is-disabled");
      filter.parentNode.removeChild(filter);
      wrapper.unmount();
    });
  });
  describe("table events", () => {
    const createTable = function (prop = "") {
      return mount({
        components: {
          WalTablePagination,
          ElTableColumn,
        },
        template: `
        <wal-table-pagination :total="200" :current-page="1" :data="testData" @${prop}="handleEvent">
          <el-table-column type="selection" />  
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="address" label="Address" />
        </wal-table-pagination>
        `,
        methods: {
          handleEvent(...val) {
            this.result = val;
          },
        },
        data() {
          return { result: null, testData: getTestData() };
        },
      });
    };
    it("select", async () => {
      const wrapper = createTable("select");
      await doubleWait();
      wrapper.findAll(".el-checkbox")[1].trigger("click");
      await doubleWait();
      expect(wrapper.vm.result.length).toEqual(2);
      expect(wrapper.vm.result[1]).toHaveProperty("address");
      expect(wrapper.vm.result[1]["address"]).toEqual(getTestData()[0].address);
      wrapper.unmount();
    });

    it("selection-change", async () => {
      const wrapper = createTable("selection-change");
      await doubleWait();
      wrapper.findAll(".el-checkbox")[1].trigger("click");
      expect(wrapper.vm.result.length).toEqual(1);
      wrapper.unmount();
    });

    it("cell-mouse-enter", async () => {
      const wrapper = createTable("cell-mouse-enter");
      await doubleWait();
      const cell = wrapper.findAll(".el-table__body .cell")[0];
      triggerEvent(cell.element.parentElement, "mouseenter");
      expect(wrapper.vm.result.length).toEqual(4);
      expect(wrapper.vm.result[0]).toHaveProperty("address");
      expect(wrapper.vm.result[0]["address"]).toEqual(getTestData()[0].address);
      wrapper.unmount();
    });

    it("cell-mouse-leave", async () => {
      const wrapper = createTable("cell-mouse-leave");
      await doubleWait();
      const cell = wrapper.findAll(".el-table__body .cell")[0];
      //依次触发mouseenter、mouseleave
      triggerEvent(cell.element.parentElement, "mouseenter");
      triggerEvent(cell.element.parentElement, "mouseleave");
      expect(wrapper.vm.result.length).toEqual(4); // row, column, cell, event
      expect(wrapper.vm.result[0]).toHaveProperty("address");
      expect(wrapper.vm.result[0]["address"]).toEqual(getTestData()[0].address);
      wrapper.unmount();
    });

    it("row-click", async () => {
      const wrapper = createTable("row-click");
      await doubleWait();
      const cell = wrapper.findAll(".el-table__body .cell")[2]; // first row
      triggerEvent(cell.element.parentElement.parentElement, "click");
      expect(wrapper.vm.result.length).toEqual(3); // row, event, column
      expect(wrapper.vm.result[0]).toHaveProperty("name");
      expect(wrapper.vm.result[0]["name"]).toEqual(getTestData()[0].name);
      wrapper.unmount();
    });

    it("row-dblclick", async () => {
      const wrapper = createTable("row-dblclick");
      await doubleWait();
      const cell = wrapper.findAll(".el-table__body .cell")[2];
      triggerEvent(cell.element.parentElement.parentElement, "dblclick");
      expect(wrapper.vm.result.length).toEqual(3); // row, event, column
      expect(wrapper.vm.result[0]).toHaveProperty("name");
      expect(wrapper.vm.result[0]["name"]).toEqual(getTestData()[0].name);
      wrapper.unmount();
    });

    it("header-click", async () => {
      const wrapper = createTable("header-click");
      await doubleWait();
      const cell = wrapper.findAll(".el-table__header th")[1]; // header[prop='name']
      cell.trigger("click");
      expect(wrapper.vm.result.length).toEqual(2); // column, event
      expect(wrapper.vm.result[0]["name"]).toBeUndefined();
      wrapper.unmount();
    });
  });
  describe("pagination events", () => {
    const createTable = function (evt = "") {
      return mount({
        components: {
          WalTablePagination,
          ElTableColumn,
        },
        template: `
        <wal-table-pagination :total="pagination.total" :current-page="pagination.currentPage" :data="tableData" @${evt}="handleEvent">
          <el-table-column type="selection" />  
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="address" label="Address" />
        </wal-table-pagination>
        `,
        data() {
          return {
            pagination: {
              currentPage: 1,
              pageSize: 20,
              total: 200,
            },
            result: null,
            tableData: [],
          };
        },
        created() {
          this.tableData = this.getTestData();
        },
        methods: {
          handleEvent(...val) {
            this.result = val;
          },
          getTestData() {
            return Array.from(
              new Array(this.pagination.pageSize),
              (item, index) => ({
                date: "2022-07-24",
                name: `victor`,
                address: `No. ${
                  ++index +
                  this.pagination.pageSize * (this.pagination.currentPage - 1)
                } , Grove St, Los Angeles`,
              })
            );
          },
        },
      });
    };
    it.fails("size-change", async () => {
      const wrapper = createTable("size-change");
      await doubleWait();
      expect(
        wrapper.findAll(".el-table__body-wrapper tbody tr").length
      ).toEqual(20);
      wrapper.find(".el-select").trigger("click");
      await doubleWait();
      expect(wrapper.find(".el-select-dropdown").isVisible()).toBe(true);
      wrapper.unmount();
    });

    it("pagination-current-change", async () => {
      const wrapper = createTable("pagination-current-change");
      await doubleWait();
      wrapper.find(".btn-next").trigger("click");
      await doubleWait();
      expect(wrapper.vm.result[0]).toBe(2);
      wrapper.unmount();
    });
  });
});

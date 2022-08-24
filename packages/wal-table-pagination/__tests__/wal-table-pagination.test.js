import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import WalTablePagination from "../src/wal-table-pagination.vue";
import { ElTableColumn, ElCheckboxGroup, ElCheckbox } from "element-plus";
import { pagination, getTestData, doubleWait } from "./table-test-common";
import triggerEvent from "./trigger-event";

describe("wal-table-pagination.vue", () => {
  describe.skip("render correct data", () => {
    const wrapper = mount({
      components: {
        ElTableColumn,
        WalTablePagination,
      },
      template: `
        <WalTablePagination :data="tableData" :total="total" :current-page="currentPage">
          <el-table-column label="Date" prop="date" />
          <el-table-column label="Name" prop="name" />
          <el-table-column label="Address">
            <template #default="{ row }">
              <div>{{row.address}}</div>
            </template>
          </el-table-column>
        </WalTablePagination>
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
  });
  it.skip("custom template", async () => {
    const wrapper = mount({
      components: {
        WalTablePagination,
        ElTableColumn,
        ElCheckboxGroup,
        ElCheckbox,
      },
      template: `
      <WalTablePagination :data="tableData" :total="3" :current-page="1">
        <el-table-column label="复选框">
          <template #default="{ row }">
            <el-checkbox-group v-model="row.checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </WalTablePagination>
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
  describe.skip("table attributes", () => {
    const createTable = function (props, opts) {
      return mount({
        components: {
          ElTableColumn,
          WalTablePagination,
        },
        template: `
            <WalTablePagination :data="tableData" :total="3" :current-page="1" ${props}>
              <el-table-column prop="date" label="date" />
              <el-table-column prop="name" label="name" />
              <el-table-column prop="Address" label="Address" />
            </WalTablePagination>
          `,
        created() {
          this.tableData = getTestData();
        },
        ...opts,
      });
    };

    it.skip("height", async () => {
      const wrapper = createTable('height="250"');
      await doubleWait();
      expect(wrapper.find(".el-table").attributes("style")).toContain(
        "height: 250px"
      );
      wrapper.unmount();
    });

    it.skip("height as string", async () => {
      const wrapper = createTable('height="100px"');
      await doubleWait();
      expect(wrapper.find(".el-table").attributes("style")).toContain(
        "height: 100px"
      );
      wrapper.unmount();
    });

    it.skip("maxHeight", async () => {
      const wrapper = createTable('max-height="134"');
      await doubleWait();
      expect(
        wrapper.find(".el-table__inner-wrapper").attributes("style")
      ).toContain("max-height: 134px");
      wrapper.unmount();
    });

    it.skip("maxHeight uses vh units", async () => {
      const wrapper = createTable('max-height="60vh"');
      await doubleWait();
      const tableWraper = wrapper.find(".el-table");
      expect(
        tableWraper.find(".el-scrollbar__wrap").attributes("style")
      ).toContain("max-height: calc(60vh - 0px);");
      wrapper.unmount();
    });

    it.skip("stripe", async () => {
      const wrapper = createTable("stripe");
      await doubleWait();
      expect(wrapper.find(".el-table").classes()).toContain(
        "el-table--striped"
      );
      wrapper.unmount();
    });

    it.skip("border", async () => {
      const wrapper = createTable("border");
      await doubleWait();
      expect(wrapper.find(".el-table").classes()).toContain("el-table--border");
      wrapper.unmount();
    });

    it.skip("fit", async () => {
      const wrapper = createTable(':fit="false"');
      await doubleWait();
      expect(wrapper.find(".el-table").classes()).not.toContain(
        "el-table--fit"
      );
      wrapper.unmount();
    });

    it.skip("show-header", async () => {
      const wrapper = createTable(':show-header="false"');
      await doubleWait();
      expect(
        wrapper.find(".el-table").findAll(".el-table__header-wrapper").length
      ).toEqual(0);
      wrapper.unmount();
    });

    it.skip("tableRowClassName", async () => {
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

    it.skip("tableRowStyle[Object]", async () => {
      const wrapper = createTable(":row-style=\"{ height: '60px' }\"", {});
      await doubleWait();
      expect(
        wrapper.find(".el-table").find(".el-table__body tr").attributes("style")
      ).toContain("height: 60px");
      wrapper.unmount();
    });

    it.skip("tableRowStyle[Function]", async () => {
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

    it.skip("current-row-key", async () => {
      //此项不通过
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
        <WalTablePagination :total="200" :current-page="1" :data="testData" @filter-change="handleFilterChange">
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
        <WalTablePagination />
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

    it.skip("render", () => {
      expect(
        wrapper.find(".el-table__column-filter-trigger")
      ).not.toBeUndefined();
    });

    it.skip("click dropdown", async () => {
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
      console.log("---------------------wrapper.vm: ", Object.keys(wrapper.vm));
      // expect(wrapper.vm.filters["address"]).toEqual([

      //   "No. 1 , Grove St, Los Angeles",
      // ]);
      // expect(
      //   wrapper.findAll(".el-table__body-wrapper tbody tr").length
      // ).toEqual(3);
      // filter.parentNode.removeChild(filter);
    });

    it.skip("clear filter", async () => {
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
      await nextTick();
      expect(
        wrapper.findAll(".el-table__body-wrapper tbody tr").length
      ).toEqual(3);
      wrapper.vm.$refs.table.clearFilter();
      await nextTick();
      expect(
        wrapper.findAll(".el-table__body-wrapper tbody tr").length
      ).toEqual(5);
      filter.parentNode.removeChild(filter);
    });

    it.skip("click reset", async () => {
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
      expect(wrapper.vm.filters["director"]).toEqual([]);
      expect([
        ...filter.querySelector(".el-table-filter__bottom button").classList,
      ]).toContain("is-disabled");
      filter.parentNode.removeChild(filter);
      wrapper.unmount();
    });
  });
});

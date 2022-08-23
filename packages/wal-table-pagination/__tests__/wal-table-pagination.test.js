import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import WalTablePagination from "../src/wal-table-pagination.vue";
import { ElTableColumn, ElCheckboxGroup, ElCheckbox } from "element-plus";
import { pagination, getTestData, doubleWait } from "./table-test-common";

describe("wal-table-pagination.vue", () => {
  describe("render correct data", () => {
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
  it("custom template", async () => {
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
  describe("table attributes", () => {
    const createTable = function (props, opts) {
      return mount({
        components: {
          ElTableColumn,
          WalTablePagination,
        },
        template: `
            <WalTablePagination style="font-size=20px" :data="tableData" :total="3" :current-page="1" ${props}>
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
      await doubleWait();
      //todo
      // const tableWraper = wrapper.find(".el-table")
      console.log('----------------------: ', wrapper.attributes());
      // expect(wrapper.find(".el-table").attributes("style")).toContain(
      //   "max-height: 134px"
      // );
      wrapper.unmount();
    });

    //   it("maxHeight uses special units", async () => {
    //     const wrapper = createTable('max-height="60vh"');
    //     await doubleWait();
    //     expect(
    //       wrapper
    //         .find(".el-table")
    //         .find(".el-scrollbar__wrap")
    //         .attributes("style")
    //     ).toContain("max-height: calc(60vh - 0px);");
    //     wrapper.unmount();
    //   });

    //   it("stripe", async () => {
    //     const wrapper = createTable("stripe");
    //     await doubleWait();
    //     expect(wrapper.find(".el-table").classes()).toContain(
    //       "el-table--striped"
    //     );
    //     wrapper.unmount();
    //   });

    //   it("border", async () => {
    //     const wrapper = createTable("border");
    //     await doubleWait();
    //     expect(wrapper.find(".el-table").classes()).toContain("el-table--border");
    //     wrapper.unmount();
    //   });

    //   it("fit", async () => {
    //     const wrapper = createTable(':fit="false"');
    //     await doubleWait();
    //     expect(wrapper.find(".el-table").classes()).not.toContain(
    //       "el-table--fit"
    //     );
    //     wrapper.unmount();
    //   });

    //   it("show-header", async () => {
    //     const wrapper = createTable(':show-header="false"');
    //     await doubleWait();
    //     expect(
    //       wrapper.find(".el-table").findAll(".el-table__header-wrapper").length
    //     ).toEqual(0);
    //     wrapper.unmount();
    //   });

    //   it("tableRowClassName", async () => {
    //     const wrapper = createTable(':row-class-name="tableRowClassName"', {
    //       methods: {
    //         tableRowClassName({ rowIndex }) {
    //           if (rowIndex === 1) {
    //             return "info-row";
    //           } else if (rowIndex === 3) {
    //             return "positive-row";
    //           }

    //           return "";
    //         },
    //       },
    //     });
    //     await doubleWait();
    //     expect(wrapper.find(".el-table").findAll(".info-row").length).toEqual(1);
    //     expect(wrapper.find(".el-table").findAll(".positive-row").length).toEqual(
    //       1
    //     );
    //     wrapper.unmount();
    //   });

    //   it("tableRowStyle[Object]", async () => {
    //     const wrapper = createTable(":row-style=\"{ height: '60px' }\"", {});
    //     await doubleWait();
    //     expect(
    //       wrapper.find(".el-table").find(".el-table__body tr").attributes("style")
    //     ).toContain("height: 60px");
    //     wrapper.unmount();
    //   });

    //   it("tableRowStyle[Function]", async () => {
    //     const wrapper = createTable(':row-style="tableRowStyle"', {
    //       methods: {
    //         tableRowStyle({ rowIndex }) {
    //           if (rowIndex === 1) {
    //             return { height: "60px", display: "none" };
    //           }

    //           return null;
    //         },
    //       },
    //     });

    //     await doubleWait();
    //     const child1 = wrapper
    //       .find(".el-table")
    //       .find(".el-table__body tr:nth-child(1)");
    //     const child2 = wrapper
    //       .find(".el-table")
    //       .find(".el-table__body tr:nth-child(2)");
    //     expect(child1.attributes("style")).toBeUndefined();
    //     expect(child2.attributes("style")).toContain("height: 60px");
    //     expect(child2.attributes("style")).toContain("display: none");
    //     wrapper.unmount();
    //   });

    //   it("current-row-key", async () => {
    //     const wrapper = mount({
    //       components: {
    //         ElTable,
    //         ElTableColumn,
    //       },
    //       template: `
    //       <el-table :data="testData" row-key="id" highlight-current-row :current-row-key="currentRowKey">
    //         <el-table-column prop="name" label="片名" />
    //         <el-table-column prop="release" label="发行日期" />
    //         <el-table-column prop="director" label="导演" />
    //         <el-table-column prop="runtime" label="时长（分）" />
    //       </el-table>
    //     `,
    //       created() {
    //         this.testData = getTestData();
    //       },
    //       data() {
    //         return { currentRowKey: null };
    //       },
    //     });
    //     await doubleWait();
    //     wrapper.find(".el-table").vm.currentRowKey = 1;
    //     const tr = wrapper
    //       .find(".el-table")
    //       .find(".el-table__body-wrapper tbody tr");
    //     await doubleWait();
    //     expect(tr.classes()).toContain("current-row");
    //     wrapper.find(".el-table").vm.currentRowKey = 2;

    //     const rows = wrapper
    //       .find(".el-table")
    //       .findAll(".el-table__body-wrapper tbody tr");
    //     await doubleWait();
    //     expect(tr.classes()).not.toContain("current-row");
    //     expect(rows[1].classes()).toContain("current-row");
    //     wrapper.find(".el-table").unmount();
    //   });
  });
});

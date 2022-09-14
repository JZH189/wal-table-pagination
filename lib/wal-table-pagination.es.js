import { defineComponent as t, useAttrs as ee, computed as h, useSlots as ne, reactive as le, cloneVNode as ce, ref as z, watch as oe, readonly as ue, openBlock as S, createElementBlock as ie, createVNode as E, unref as b, mergeProps as _, withCtx as de, createBlock as he } from "vue";
import { ElTable as ge, ElPagination as fe } from "element-plus";
const me = t({
  name: "WalTablePagination"
}), x = /* @__PURE__ */ Object.assign(me, {
  props: {
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 200];
      }
    },
    data: {
      type: Array,
      required: !0
    },
    currentPage: {
      type: Number,
      required: !0
    },
    pageSize: {
      type: Number,
      required: !1
    },
    total: {
      type: Number,
      required: !0
    }
  },
  emits: [
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
  ],
  setup(p, { expose: A, emit: l }) {
    const C = p;
    function P(n, e) {
      return h(() => ({
        data: n == null ? void 0 : n.data,
        height: e == null ? void 0 : e.height,
        "max-height": e == null ? void 0 : e["max-height"],
        stripe: e == null ? void 0 : e.stripe,
        border: e == null ? void 0 : e.border,
        size: e == null ? void 0 : e.size,
        fit: e == null ? void 0 : e.fit,
        "show-header": e == null ? void 0 : e["show-header"],
        "highlight-current-row": e == null ? void 0 : e["highlight-current-row"],
        "current-row-key": e == null ? void 0 : e["current-row-key"],
        "row-class-name": e == null ? void 0 : e["row-class-name"],
        "row-style": e == null ? void 0 : e["row-style"],
        "cell-class-name": e == null ? void 0 : e["cell-class-name"],
        "cell-style": e == null ? void 0 : e["cell-style"],
        "header-row-class-name": e == null ? void 0 : e["header-row-class-name"],
        "header-row-style": e == null ? void 0 : e["header-row-style"],
        "header-cell-class-name": e == null ? void 0 : e["header-cell-class-name"],
        "header-cell-style": e == null ? void 0 : e["header-cell-style"],
        "row-key": e == null ? void 0 : e["row-key"],
        "empty-text": e == null ? void 0 : e["empty-text"],
        "default-expand-all": e == null ? void 0 : e["default-expand-all"],
        "expand-row-keys": e == null ? void 0 : e["expand-row-keys"],
        "default-sort": e == null ? void 0 : e["default-sort"],
        "tooltip-effect": e == null ? void 0 : e["tooltip-effect"],
        "show-summary": e == null ? void 0 : e["show-summary"],
        "sum-text": e == null ? void 0 : e["sum-text"],
        "summary-method": e == null ? void 0 : e["summary-method"],
        "span-method": e == null ? void 0 : e["span-method"],
        "select-on-indeterminate": e == null ? void 0 : e["select-on-indeterminate"],
        indent: e == null ? void 0 : e.indent,
        lazy: e == null ? void 0 : e.lazy,
        load: e == null ? void 0 : e.load,
        "tree-props": e == null ? void 0 : e["tree-props"],
        "table-layout": e == null ? void 0 : e["table-layout"],
        "scrollbar-always-on": e == null ? void 0 : e["scrollbar-always-on"],
        flexible: e == null ? void 0 : e.flexible
      }));
    }
    function D(n) {
      var e;
      return ((e = n.type) == null ? void 0 : e.name) === "ElTableColumn";
    }
    function N(n, e) {
      return h(() => ({
        small: e == null ? void 0 : e.small,
        background: e == null ? void 0 : e.background,
        "page-size": n == null ? void 0 : n.pageSize,
        "default-page-size": e == null ? void 0 : e["default-page-size"],
        total: n == null ? void 0 : n.total,
        "page-count": e == null ? void 0 : e["page-count"],
        "pager-count": e == null ? void 0 : e["pager-count"],
        "current-page": n == null ? void 0 : n.currentPage,
        "default-current-page": e == null ? void 0 : e["default-current-page"],
        layout: (e == null ? void 0 : e.layout) || "total, sizes, prev, pager, next, jumper",
        "page-sizes": n == null ? void 0 : n.pageSizes,
        "popper-class": e == null ? void 0 : e["popper-class"],
        "prev-text": e == null ? void 0 : e["prev-text"],
        "next-text": e == null ? void 0 : e["next-text"],
        disabled: e == null ? void 0 : e.disabled,
        "hide-on-single-page": e == null ? void 0 : e["hide-on-single-page"]
      }));
    }
    const k = ee(), R = P(C, k), T = N(C, k), m = h(() => {
      var c, u;
      const n = (u = (c = ne()).default) == null ? void 0 : u.call(c), e = [], o = [], i = [];
      return n == null || n.forEach((d) => {
        if (D(d)) {
          const { fixed: g } = d.props || {};
          if (g) {
            if (g === "left")
              return e.push(d);
            if (g === "right")
              return o.push(d);
          } else
            return i.push(d);
        }
      }), {
        tableLeft: e,
        tableRight: o,
        contents: i
      };
    }), f = le({
      slot: h(
        () => m.value.contents.map(({ props: n }) => ({
          prop: n.prop,
          label: n.label,
          visiable: n.visiable || !0
        }))
      ),
      storage: [],
      render: h(() => {
        const n = [...f.slot], e = [...f.storage], o = [];
        return e.forEach((i) => {
          const c = n.findIndex(({ prop: u }) => u === i.prop);
          if (c >= 0) {
            const u = n[c];
            o.push({
              ...u,
              ...i
            }), n.splice(c, 1);
          }
        }), o.push(...n), o;
      })
    }), y = h(() => {
      const { contents: n } = m.value, e = [];
      return f.render.forEach(({ prop: o, visiable: i }) => {
        if (!i)
          return;
        const c = n.find((d) => {
          var g;
          return o === ((g = d.props) == null ? void 0 : g.prop);
        });
        if (!c)
          return;
        const u = ce(c);
        e.push(u);
      }), e;
    }), w = z(0);
    oe(y, () => w.value += 1);
    const q = () => [m.value.tableLeft, y.value, m.value.tableRight];
    function L(n) {
      l("size-change", n);
    }
    function M(n) {
      l("pagination-current-change", n);
    }
    function B(n) {
      l("prev-click", n);
    }
    function H(n) {
      l("next-click", n);
    }
    function j(...n) {
      l("select", ...n);
    }
    function F(...n) {
      l("select-all", ...n);
    }
    function V(...n) {
      l("selection-change", ...n);
    }
    function I(...n) {
      l("cell-mouse-enter", ...n);
    }
    function O(...n) {
      l("cell-mouse-leave", ...n);
    }
    function W(...n) {
      l("cell-click", ...n);
    }
    function a(...n) {
      l("cell-dblclick", ...n);
    }
    function G(...n) {
      l("cell-contextmenu", ...n);
    }
    function J(...n) {
      l("row-click", ...n);
    }
    function K(...n) {
      l("row-contextmenu", ...n);
    }
    function Q(...n) {
      l("row-dblclick", ...n);
    }
    function U(...n) {
      l("header-click", ...n);
    }
    function X(...n) {
      l("header-contextmenu", ...n);
    }
    function Y(...n) {
      l("sort-change", ...n);
    }
    function Z(...n) {
      l("filter-change", ...n);
    }
    function $(...n) {
      l("table-current-change", ...n);
    }
    function r(...n) {
      l("header-dragend", ...n);
    }
    function s(...n) {
      l("expand-change", ...n);
    }
    const v = z();
    return A({
      table: v,
      columns: h(() => ue(f.render)),
      updateColumns(n) {
        f.storage = n;
      }
    }), (n, e) => (S(), ie("div", null, [
      E(b(ge), _({
        ref_key: "table",
        ref: v
      }, b(R), {
        onSelect: j,
        onSelectAll: F,
        onSelectionChange: V,
        onCellMouseEnter: I,
        onCellMouseLeave: O,
        onCellClick: W,
        onCellDblclick: a,
        onCellContextmenu: G,
        onRowClick: J,
        onRowContextmenu: K,
        onRowDblclick: Q,
        onHeaderClick: U,
        onHeaderContextmenu: X,
        onSortChange: Y,
        onFilterChange: Z,
        onCurrentChange: $,
        onHeaderDragend: r,
        onExpandChange: s
      }), {
        default: de(() => [
          (S(), he(q, { key: w.value }))
        ]),
        _: 1
      }, 16),
      E(b(fe), _(b(T), {
        onSizeChange: L,
        onCurrentChange: M,
        onPrevClick: B,
        onNextClick: H
      }), null, 16)
    ]));
  }
});
x.install = function(p) {
  p.component(x.name, x);
};
export {
  x as default
};

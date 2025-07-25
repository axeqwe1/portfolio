<script setup lang="tsx">
import { computed, onMounted, ref, watch } from "vue";
import {
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  FlexRender,
  getFilteredRowModel,
  type ColumnDef,
  createColumnHelper,
  getFacetedUniqueValues,
} from "@tanstack/vue-table";
import type { ProductionData } from "@/data/type";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-vue";
import { useWindowSize } from "@/composables/useWindowSize";
import { columns } from "./column";
import type { CSSProperties } from "vue";
const props = defineProps<{ datalist: ProductionData[] }>();
const data = ref(props.datalist);
const isChecked = ref(false);
const columnHelper = createColumnHelper<ProductionData>();
const pagin = ref({ paginIndex: 0, pageSize: 50 });
const pageSize = ref([10, 20, 30, 40, 50]);
const { width } = useWindowSize();
const table = ref();
const isMobile = computed(() => width.value < 568);
const isTablet = computed(() => width.value <= 1366);
watch(props, () => {
  data.value = props.datalist;
});

watch(
  () => width.value,
  () => {
    console.log(isMobile.value);
    table.value = useVueTable<ProductionData>({
      data: data,
      columns: columns,
      state: {
        columnPinning: {
          left: isMobile.value
            ? ["group-line", "group", "line"]
            : isTablet.value
            ? [
                "group-line",
                "group",
                "line",
                "EffLine",
                "eff",
                "effB",
                "order",
                "effOrder",
              ]
            : [
                "group-line",
                "group",
                "line",
                "EffLine",
                "eff",
                "effB",
                "order",
                "effOrder",
                "perDefect",
                "runDay",
                "wk",
                "orderNo",
                "style",
                "customer",
              ],
        },
        rowPinning: {
          top: !isTablet.value
            ? [
                "group-line",
                "group",
                "line",
                "EffLine",
                "eff",
                "effB",
                "order",
                "effOrder",
                "perDefect",
                "runDay",
                "wk",
                "orderNo",
                "style",
                "customer",
              ]
            : ["group-line", "group", "line"],
        },
        pagination: {
          pageIndex: pagin.value.paginIndex,
          pageSize: pagin.value.pageSize,
        },
      },
      columnResizeMode: "onChange",
      enableColumnResizing: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      enableColumnPinning: true,
      enableRowPinning: true,
      getFilteredRowModel: getFilteredRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
    });
  },
  { immediate: true }
);

function handleGoToPage(e: any) {
  const page = e.target.value ? Number(e.target.value) - 1 : 0;
  pagin.value.paginIndex = page + 1;
  table.value.setPageIndex(page);
}
function handlePageSizeChange(e: any) {
  table.value.setPageSize(Number(e.target.value));
}

onMounted(() => {
  const data = table.value.getHeaderGroups();
  const left = table.value.getLeafHeaders();
  const columnRelativeDepth =
    data[0].headers[0].depth - data[0].headers[0].column.depth;
  // console.log(table.value.getHeaderGroups());
  // console.log(data[0].headers[0].column);
  // console.log(data);
  // console.log(left);
});

function getPinningStyle(column: any): CSSProperties {
  if (!column.getIsPinned()) return {};
  const isPinned = column.getIsPinned();
  let groupIndex = 0;
  if (column.columns.length > 0) {
    for (let i = 0; i < column.columns.length; i++) {
      groupIndex += column.columns[i].getSize();
    }
    // console.log(groupIndex);
  }
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");
  if (column.id == "group-line") {
    return {
      position: "sticky",
      left: isPinned === "left" ? `${0}px` : undefined,

      background: "#f7f7f7",
      border: "1px solid",
      borderCollapse: "separate",
    };
  }
  if (column.id == "EffLine") {
    return {
      position: "sticky",
      left: isPinned === "left" ? `${197.2}px` : undefined,

      background: "#f7f7f7",
      border: "1px solid",
      borderCollapse: "separate",
    };
  }
  if (column.id == "order") {
    return {
      position: "sticky",
      left: isPinned === "left" ? `${197.2 + 147.2}px` : undefined,

      background: "#f7f7f7",
      border: "1px solid",
      borderCollapse: "separate",
    };
  }

  return {
    position: "sticky",
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,

    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    zIndex: 10,
    background: "#f7f7f7",
    border: "1px solid",
    borderCollapse: "separate",
  };
}

function getPinningClass(column: any, row?: any): string {
  const id = column.id;
  const classes: string[] = [];

  const idClassMap = new Map<string, string>([
    ["standard", "bg-red-400 font-bold"],
    ["qu", "bg-red-300 font-bold"],
    ["production", "bg-green-300 font-bold"],
    ["Estimated", "bg-green-300/50 font-bold"],
    ["SAMG", "bg-amber-300/50 font-bold"],
  ]);

  const group1 = new Set(["total1", "total2", "total3", "total4"]);
  // const group2 = new Set([
  //   "actHour0",
  //   "actHour1",
  //   "actHour2",
  //   "actHour3",
  //   "actHour4",
  // ]);
  // const group3 = new Set([
  //   "actHourg0",
  //   "actHourg1",
  //   "actHourg2",
  //   "actHourg3",
  //   "actHourg4",
  // ]);

  if (group1.has(id)) classes.push("bg-amber-300/50 font-bold text-sky-700");
  // if (group2.has(id)) classes.push("bg-orange-200/50");
  // if (group3.has(id)) classes.push("bg-yellow-200/50");

  if (idClassMap.has(id)) classes.push(idClassMap.get(id)!);

  // ─── Body ─────────────────────────────────────────────────────────
  if (row) {
    const { eff, effB, effOrder, isShift, sampro, samqu, samacl } =
      row.original;

    if (id === "eff") {
      classes.push(getEffColor(eff));
    }

    if (id === "effB" && isShift) {
      classes.push(getEffColor(effB));
    }

    if (id === "effOrder") {
      classes.push(getEffColor(effOrder));
    }

    if (id === "production") {
      classes.push(
        sampro < samqu
          ? "bg-green-700 font-bold text-white"
          : "bg-green-300 font-bold"
      );
    }

    if (id === "samacl" && samacl < samqu) {
      classes.push("bg-green-700 font-bold text-white");
    }
  }

  // ─── Header ────────────────────────────────────────────────────────
  if (!row && id === "perDefect") {
    classes.push("bg-amber-200! text-amber-500");
  }

  return classes.join(" ");
}

// ─── Utility: Get efficiency color ───────────────────────────────────

function getEffColor(value: number): string {
  if (value < 35) return "bg-black! font-bold text-white";
  if (value < 57) return "bg-red-500! font-bold text-amber-400";
  if (value < 65) return "bg-yellow-400! font-bold text-sky-700";
  return "bg-green-500! font-bold text-black";
}
</script>

<template>
  <div class="p-3 rounded h-full">
    <div
      class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 h-[500px]"
    >
      <table class="table pinned-table">
        <thead class="sticky top-0 z-20 bg-neutral-50">
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <template v-for="(header, index) in headerGroup.headers">
              <th
                v-if="
                  !(
                    !header.isPlaceholder &&
                    header.depth - header.column.depth > 1
                  )
                "
                :key="header.id"
                :colspan="header.colSpan"
                :rowspan="header.isPlaceholder ? 0 : 1"
                :style="getPinningStyle(header.column)"
                :class="[getPinningClass(header.column)]"
              >
                <!-- header.getLeafHeaders()[
                        header.getLeafHeaders().length - 1
                      ].depth - header.depth -->
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-if="table.getRowModel().rows.length > 0">
            <tr
              v-for="(item, index) in table.getRowModel().rows"
              :key="item.id"
            >
              <td
                v-for="row in item.getVisibleCells()"
                :key="row.id"
                :style="getPinningStyle(row.column)"
                :class="getPinningClass(row.column, row.row)"
              >
                <FlexRender
                  :render="row.column.columnDef.cell"
                  :props="row.getContext()"
                />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td
                :colspan="table.getAllColumns().length / 3"
                class="text-center text-gray-400 py-4 sticky left-0 border-0!"
              >
                No data available
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="footer pt-3">
      <div>
        <span
          >Total Data: {{ table.getFilteredRowModel().rows.length }} Rows</span
        >
      </div>
      <div
        class="flex flex-row-reverse md:flex-row justify-center items-center"
      >
        <div class="flex flex-row justify-center items-center gap-1">
          <button
            class="btn btn-sm btn-accent flex justify-center items-center"
            @click="() => table.previousPage()"
            :disabled="!table.getCanPreviousPage()"
          >
            <IconArrowLeft />
          </button>
          <button
            class="btn btn-sm btn-accent flex justify-center items-center"
            @click="() => table.nextPage()"
            :disabled="!table.getCanNextPage()"
          >
            <IconArrowRight />
          </button>
        </div>

        <div class="flex items-center justify-center gap-1 h-full">
          <div>Page</div>
          <strong class="w-10">
            {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </strong>
        </div>
        <select
          v-if="!isMobile"
          class="select w-25"
          :value="table.getState().pagination.pageSize"
          @change="handlePageSizeChange"
        >
          <option
            :key="pageSize"
            :value="pageSize"
            v-for="pageSize in pageSize"
          >
            Show {{ pageSize }}
          </option>
        </select>
        <!-- <span v-if="!isMobile" class="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            :value="pagin.paginIndex"
            @change="handleGoToPage"
            class="input border p-1 rounded w-12"
            min="1"
            :max="table.getPageCount()"
          />
        </span> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* th {
  padding: 0 !important;
}
td {
  padding: 0 !important;
} */
.pinned-table {
  border-collapse: separate;
  border-spacing: 0;
}

.pinned-table th,
.pinned-table td {
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.pinned-table th:first-child,
.pinned-table td:first-child {
  border-left: 1px solid #e0e0e0;
}

.pinned-table thead tr:first-child th {
  border-top: 1px solid #e0e0e0;
}

/* สำหรับ pinned columns */
.pinned-left {
  position: sticky;
  z-index: 10;
}

.pinned-right {
  position: sticky;
  z-index: 10;
}

.pinned-left-last {
  box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.1);
}

.pinned-right-first {
  box-shadow: -2px 0 4px -2px rgba(0, 0, 0, 0.1);
}
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>

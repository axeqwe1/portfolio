<template>
  <div class="p-3 rounded w-full">
    <div
      class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
    >
      <table class="table table-xs md:table-md">
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              class="text-sky-700 bg-neutral-100 border-1"
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colspan="header.colSpan"
            >
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in table.getRowModel().rows" :key="item.id">
            <td
              class="border-1"
              v-for="row in item.getVisibleCells()"
              :key="row.id"
              :class="getPinningClass(row.column, row.row)"
            >
              <FlexRender
                :render="row.column.columnDef.cell"
                :props="row.getContext()"
              />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-for="footer in table.getFooterGroups()" :key="footer.id">
            <th
              v-for="(header, index) in footer.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              :class="[
                index > 0 && index != footer.headers.length - 1
                  ? 'bg-gray-100 border-1'
                  : '',
                ,
                getPinningClass(header.column, null, header.column),
              ]"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.footer"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { computed, h, onMounted, ref, toRef, watch } from "vue";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  FlexRender,
  type ColumnDef,
  createColumnHelper,
} from "@tanstack/vue-table";
import type { ProductionData, SupervisorData } from "@/data/type";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-vue";
import { useWindowSize } from "@/composables/useWindowSize";

const props = defineProps<{
  datalist: SupervisorData[];
  minutePercent: number;
}>();
const data = toRef(props, "datalist");
const minnutePercent = toRef(props, "minutePercent");
const isChecked = ref(false);
const columnHelper = createColumnHelper<SupervisorData>();
const pagin = ref({ paginIndex: 1, pageSize: 10 });
const pageSize = ref([10, 20, 30, 40, 50]);
const { width } = useWindowSize();
const table = ref();
const isMobile = computed(() => width.value < 768);

const averageEff = computed(() => {
  const data = table.value.getRowModel().rows.map((r: any) => r.original);
  const sumTarget = data.reduce((acc: any, cur: any) => acc + cur.target, 0);
  const sumAct = data.reduce((acc: any, cur: any) => acc + cur.actual, 0);
  return data.length ? (sumAct / sumTarget) * 100 : 0;
});

const averageEffs = computed(() => {
  return minnutePercent;
});
const columns = computed<ColumnDef<SupervisorData>[]>(() => [
  {
    accessorKey: "super",
    header: "Supervisor",
    cell: ({ row }) => {
      return <div>{row.original.super}</div>;
    },
  },
  {
    accessorKey: "groupLineName",
    header: "GROUP",
    cell: ({ row }) => {
      return (
        <div>
          <div>{row.original.groupLineName}</div>
        </div>
      );
    },
    footer: (row) => {
      return (
        <div>
          <div>Total / Day</div>
        </div>
      );
    },
  },
  {
    accessorKey: "targetpercent",
    header: "Target%",
    cell: ({ row }) => {
      return (
        <div>
          <div>
            {row.original.targetpercent.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
        </div>
      );
    },
    footer: (info) => {
      const data = info.table.getRowModel().rows.map((item) => item.original);
      const sum = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.targetpercent,
        0
      );
      const average = sum / data.length;

      return (
        <div>
          <div>
            {average.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "target",
    header: "Target",
    cell: ({ row }) => {
      return (
        <div>
          <div>{row.original.target.toLocaleString()}</div>
        </div>
      );
    },
    footer: (info) => {
      const data = info.table.getRowModel().rows.map((item) => item.original);
      const sum = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.target,
        0
      );

      return (
        <div>
          <div>{sum.toLocaleString()}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "actual",
    header: "Actual",
    cell: ({ row }) => {
      return (
        <div>
          <div>{row.original.actual.toLocaleString()}</div>
        </div>
      );
    },
    footer: (info) => {
      const data = info.table.getRowModel().rows.map((item) => item.original);
      const sum = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.actual,
        0
      );

      return (
        <div>
          <div>{sum.toLocaleString()}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "supDf",
    header: "Diff+/-",
    cell: ({ row }) => {
      return (
        <div>
          <div>{row.original.supDf.toLocaleString()}</div>
        </div>
      );
    },
    footer: (info) => {
      const data = info.table.getRowModel().rows.map((item) => item.original);
      const sum = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.supDf,
        0
      );

      return (
        <div>
          <div>{sum.toLocaleString()}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "eff",
    header: "Effective",
    cell: ({ row }) => {
      return (
        <div>
          <div>{row.original.eff} %</div>
        </div>
      );
    },
    footer: () => h("div", `${averageEff.value.toFixed(2)} %`),
  },
  {
    accessorKey: "effs",
    header: "Eff%",
    cell: ({ row }) => {
      return (
        <div>
          <div>{row.original.effs.toFixed(2)} %</div>
        </div>
      );
    },
    footer: () =>
      h(
        "div",
        `${(minnutePercent.value
          ? Math.ceil(minnutePercent.value * 100) / 100
          : 0
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} %`
      ),
  },
  {
    accessorKey: "lineStatus",
    header: "LineStatus",
    cell: ({ row }) => {
      return (
        <div>
          <div>{}</div>
        </div>
      );
    },
  },
]);

watch(
  () => data.value,
  () => {
    table.value = useVueTable<SupervisorData>({
      data: data.value,
      columns: columns.value,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
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

function getPinningClass(column: any, row?: any, footer?: any): string {
  const id = column.id;
  const classes: string[] = [];

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

  // ─── Body ─────────────────────────────────────────────────────────
  if (row) {
    const { eff, effs, effOrder, isShift, sampro, samqu, samacl } =
      row.original;

    if (id === "eff") {
      classes.push(getEffColor(eff), "font-bold");
    }

    if (id === "effs") {
      classes.push(getEffColor(effs), "font-bold");
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

  // -- Footer -----
  if (footer) {
    // console.log(footer);
    if (id === "eff") {
      classes.push(getEffColor(averageEff.value));
    }
    if (id === "effs") {
      classes.push(getEffColor(minnutePercent.value));
    }
  }

  return classes.join(" ");
}

function getEffColor(value: number): string {
  if (value < 35) return "bg-black! font-bold text-white";
  if (value < 57) return "bg-red-500! font-bold text-amber-400";
  if (value < 65) return "bg-yellow-400! font-bold text-sky-700";
  return "bg-green-500! font-bold text-black";
}
</script>

<style scoped></style>

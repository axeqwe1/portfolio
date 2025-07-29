import type { ProductionData } from "@/data/type";
import { createColumnHelper } from "@tanstack/vue-table";
import CustomFilterCheckbox from "../table/CustomFilterCheckbox.vue";

const columnHelper = createColumnHelper<ProductionData>();

export const columns = [
  columnHelper.group({
    id: "group-line", // ← ต้องมี id เสมอ!
    header: () => (
      <span class="flex flex-row justify-center items-center ">GroupLine</span>
    ),
    columns: [
      columnHelper.accessor("lineGroup", {
        id: "group",
        header: ({ column }) => (
          <span class="flex flex-row justify-center items-center  w-[90px]">
            Group
            <CustomFilterCheckbox column={column} />
          </span>
        ),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return true;
          // ในกรณีที่ filterValue เป็น array
          return filterValue.includes(row.getValue(columnId));
        },
        cell: (info) => (
          <span class="flex flex-row justify-start items-center  w-[90px] whitespace-break-spaces">
            {info.getValue()}
          </span>
        ),
        size: 123.6,
      }),
      columnHelper.accessor("line", {
        id: "line",
        header: () => (
          <span class="flex flex-row justify-center items-center gap-1.5  w-[40px]">
            <span class="">Line</span>
          </span>
        ),
        cell: (info) => (
          <span class="flex flex-row justify-center items-center  w-[40px]">
            {info.getValue()}
          </span>
        ),
        size: 73.6,
      }),
    ],
  }),
  columnHelper.group({
    id: "EffLine",
    header: () => (
      <span class="flex flex-row justify-center items-center font-bold">
        %EF Line
      </span>
    ),
    columns: [
      columnHelper.accessor("eff", {
        id: "eff",
        header: () => (
          <span class="flex flex-row justify-center items-center font-bold w-[40px]">
            shiftA
          </span>
        ),
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
        size: 73.6,
      }),
      columnHelper.accessor("effB", {
        id: "effB",
        header: () => (
          <span class="flex flex-row justify-center items-center font-bold w-[40px]">
            shiftB
          </span>
        ),

        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class={`flex flex-row justify-center items-center w-[40px] `}>
              {formatted}
            </span>
          );
        },
        size: 73.6,
      }),
    ],
  }),
  columnHelper.group({
    id: "order",
    header: () => {
      return (
        <div class={`    flex flex-col   items-center rounded w-[50px] `}>
          <div>eff%</div>
        </div>
      );
    },
    columns: [
      columnHelper.accessor("effOrder", {
        id: "effOrder",
        header: () => {
          return (
            <div class={` flex flex-col   items-center rounded w-[50px] `}>
              <div> order</div>
            </div>
          );
        },
        cell: (props) => {
          return (
            <div class=" w-[50px] px-2">
              {props.getValue() ? props.getValue().toFixed(2) : 0.0}
            </div>
          );
        },
        size: 83.6,
      }),
    ],
  }),

  columnHelper.accessor("perDefect", {
    id: "perDefect",
    header: () => {
      return (
        <div class={`  h-[50px] flex flex-col  items-center rounded w-[50px] `}>
          <div>%</div>
          <div class={`whitespace-break-spaces `}>Defect</div>
        </div>
      );
    },
    cell: (props) => {
      return (
        <div class=" w-[50px] px-2 font-bold text-amber-700">
          {props.getValue()}
        </div>
      );
    },
    size: 83.6,
  }),
  columnHelper.accessor("runDay", {
    id: "runDay",
    header: () => {
      return <span class={`w-[50px]`}>RunDay</span>;
    },
    cell: (props) => {
      return <span class={`w-[50px]`}>{props.getValue()}</span>;
    },
    size: 85.08,
  }),
  columnHelper.accessor("wk", {
    id: "wk",
    header: () => {
      return (
        <span class={`flex justify-center items-center w-[40px]`}>S/O</span>
      );
    },
    cell: (props) => {
      return (
        <span
          class={`whitespace-break-spaces flex justify-center items-center w-[40px]`}
        >
          {props.getValue()}
        </span>
      );
    },
    size: 73.6,
  }),
  columnHelper.accessor("orderNo", {
    id: "orderNo",
    header: () => {
      return <span class={`flex  w-[110px]`}>Order No</span>;
    },
    cell: (props) => {
      return (
        <span class={`whitespace-break-spaces flex `}>{props.getValue()}</span>
      );
    },
    size: 143.6,
  }),
  columnHelper.accessor("style", {
    id: "style",
    header: () => {
      return <span class={`flex  w-[68px]`}>Style</span>;
    },
    cell: (props) => {
      return (
        <span class={`whitespace-break-spaces flex`}>{props.getValue()}</span>
      );
    },
    size: 102.34,
  }),
  columnHelper.accessor("customer", {
    id: "customer",
    header: () => {
      return <span class={`w-[50px]`}>Cust</span>;
    },
    cell: (props) => {
      return <span class={`w-[50px]`}>{props.getValue()}</span>;
    },
  }),
  columnHelper.accessor("programCode", {
    id: "programCode",
    header: () => {
      return <span>ProgramCode</span>;
    },
    cell: (props) => {
      return <span class={`whitespace-nowrap`}>{props.getValue()}</span>;
    },
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: () => {
      return <span>Type</span>;
    },
    cell: (props) => {
      return <span class={`whitespace-nowrap`}>{props.getValue()}</span>;
    },
  }),
  columnHelper.accessor("shipDate", {
    id: "shipDate",
    header: () => {
      return <span>ShipDate</span>;
    },
    cell: (props) => {
      const date = new Date(props.row.original.shipDate);
      const today = new Date();
      const isGreater = date > today;
      return (
        <span
          class={`${isGreater ? "text-sky-800" : "text-red-500"} font-bold`}
        >
          {props.row.original.shipDate != null
            ? date.toLocaleDateString("th-TH")
            : ""}
        </span>
      );
    },
  }),
  columnHelper.group({
    id: "Work Hour",
    header: () => {
      return <span>Work Hour</span>;
    },
    columns: [
      columnHelper.accessor("workDay", {
        id: "workday",
        header: () => {
          return (
            <span class={`flex flex-col justify-center items-center`}>Day</span>
          );
        },
        cell: (props) => {
          return (
            <span class={`flex flex-col justify-center items-center`}>
              {props.getValue()}
            </span>
          );
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "SAMG",
    header: () => {
      return (
        <>
          <span class={`flex justify-center items-center`}>SAM</span>
        </>
      );
    },
    columns: [
      columnHelper.accessor("sam", {
        id: "standard",
        header: () => {
          return <span class={`flex w-[90px]`}>Standard</span>;
        },
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
      }),
      columnHelper.accessor("samqu", {
        id: "qu",
        header: () => {
          return <span class={`flex w-[90px]`}>QU</span>;
        },
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
      }),
      columnHelper.accessor("sampro", {
        id: "production",
        header: () => {
          return <span class={`flex w-[90px]`}>Production</span>;
        },
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
      }),
      columnHelper.accessor("samEst", {
        id: "Estimated",
        header: () => {
          return <span class={`flex w-[90px]`}>Estimated</span>;
        },
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
      }),
    ],
  }),
  columnHelper.accessor("samacl", {
    id: "samacl",
    header: () => {
      return (
        <div class={`flex flex-col justify-center items-center`}>
          <span>SAM </span>
          <span>Production</span>
          <span>(Order/Line)</span>
        </div>
      );
    },
    cell: (props) => {
      const value = props.getValue();
      const formatted =
        typeof value === "number"
          ? value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : "-";
      return <span class="flex justify-center items-center">{formatted}</span>;
    },
  }),
  columnHelper.group({
    id: "target",
    header: () => {
      return (
        <span class={`flex flex-row justify-center items-center`}>Target</span>
      );
    },
    columns: [
      columnHelper.accessor("workEff", {
        id: "workEff",
        header: () => {
          return <span>%Premium</span>;
        },
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
      }),
      columnHelper.accessor("total", {
        id: "totalEff",
        header: () => {
          return <span>100% (PCS)</span>;
        },
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "ActPCS",
    header: () => {
      return <span class={`flex justify-center items-center`}>ACT PCS</span>;
    },
    columns: [
      columnHelper.accessor("totalActualA", {
        id: "totalActualA",
        header: () => {
          return (
            <span class={`flex justify-center items-center`}>Shift A</span>
          );
        },
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
      }),
      columnHelper.accessor("totalActualB", {
        id: "totalActualB",
        header: () => {
          return (
            <span class={`flex justify-center items-center`}>Shift B</span>
          );
        },
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
      }),
      columnHelper.accessor("totalActual", {
        id: "totalActual",
        header: () => {
          return <span>Total</span>;
        },
        cell: (props) => {
          const value = props.getValue();
          const formatted =
            typeof value === "number"
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
              : "-";
          return (
            <span class="flex justify-center items-center">{formatted}</span>
          );
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg0",
    header: "08:00",
    columns: [
      columnHelper.accessor("actHour0", {
        id: "actHour0",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "actHourg1",
    header: "09:00",
    columns: [
      columnHelper.accessor("actHour1", {
        id: "actHour1",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg2",
    header: "10:00",
    columns: [
      columnHelper.accessor("actHour2", {
        id: "actHour2",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg3",
    header: "11:00",
    columns: [
      columnHelper.accessor("actHour3", {
        id: "actHour3",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg4",
    header: "12:00",
    columns: [
      columnHelper.accessor("actHour4", {
        id: "actHour4",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.accessor("total1", {
    id: "total1",
    header: () => {
      return (
        <div class={` flex justify-center items-center w-full h-full `}>
          <span>Total1</span>
        </div>
      );
    },
    cell: (props) => {
      return (
        <span class={` flex justify-center items-center w-full h-full`}>
          {props.getValue()}
        </span>
      );
    },
  }),
  columnHelper.group({
    id: "actHourgNoon",
    header: "13:00",
    columns: [
      columnHelper.accessor("actHourNoon", {
        id: "actHourNoon",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "actHourg5",
    header: "14:00",
    columns: [
      columnHelper.accessor("actHour5", {
        id: "actHour5",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg6",
    header: "15:00",
    columns: [
      columnHelper.accessor("actHour6", {
        id: "actHour6",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg7",
    header: "16:00",
    columns: [
      columnHelper.accessor("actHour7", {
        id: "actHour7",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg8",
    header: "17:00",
    columns: [
      columnHelper.accessor("actHour8", {
        id: "actHour8",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.accessor("total2", {
    id: "total2",
    header: () => {
      return (
        <div class={` flex justify-center items-center w-full h-full `}>
          <span>Total2</span>
        </div>
      );
    },
    cell: (props) => {
      return (
        <span class={` flex justify-center items-center w-full h-full`}>
          {props.getValue()}
        </span>
      );
    },
  }),
  columnHelper.group({
    id: "actHourg9",
    header: "18:00",
    columns: [
      columnHelper.accessor("actHour9", {
        id: "actHour9",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "actHourg10_1",
    header: "18:30",
    columns: [
      columnHelper.accessor("actHour10_1", {
        id: "actHour10_1",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg10",
    header: "19:00",
    columns: [
      columnHelper.accessor("actHour10", {
        id: "actHour10",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg11",
    header: "20:00",
    columns: [
      columnHelper.accessor("actHour11", {
        id: "actHour11",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHour12",
    header: "21:00",
    columns: [
      columnHelper.accessor("actHour12", {
        id: "actHour12",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHour13",
    header: "22:00",
    columns: [
      columnHelper.accessor("actHour13", {
        id: "actHour13",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.accessor("total3", {
    id: "total3",
    header: () => {
      return (
        <div class={` flex justify-center items-center w-full h-full `}>
          <span>Total3</span>
        </div>
      );
    },
    cell: (props) => {
      return (
        <span class={` flex justify-center items-center w-full h-full`}>
          {props.getValue()}
        </span>
      );
    },
  }),
  columnHelper.group({
    id: "actHourg14",
    header: "23:00",
    columns: [
      columnHelper.accessor("actHour14", {
        id: "actHour14",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "actHourg15",
    header: "00:00",
    columns: [
      columnHelper.accessor("actHour15", {
        id: "actHour15",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg16",
    header: "01:00",
    columns: [
      columnHelper.accessor("actHour16", {
        id: "actHour16",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg17",
    header: "02:00",
    columns: [
      columnHelper.accessor("actHour17", {
        id: "actHour17",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg18",
    header: "03:00",
    columns: [
      columnHelper.accessor("actHour18", {
        id: "actHour18",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg19",
    header: "04:00",
    columns: [
      columnHelper.accessor("actHour19", {
        id: "actHour19",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: "actHourg20",
    header: "05:00",
    columns: [
      columnHelper.accessor("actHour20", {
        id: "actHour20",
        header: "ACT",
        cell: (props) => (
          <span class={`flex items-center justify-center`}>
            {props.getValue()}
          </span>
        ),
      }),
    ],
  }),
  columnHelper.accessor("total4", {
    id: "total4",
    header: () => {
      return (
        <div class={` flex justify-center items-center w-full h-full `}>
          <span>Total4</span>
        </div>
      );
    },
    cell: (props) => {
      return (
        <span class={` flex justify-center items-center w-full h-full`}>
          {props.getValue()}
        </span>
      );
    },
  }),
  columnHelper.accessor("actACL", {
    id: "actACL",
    header: () => {
      return (
        <div class={`flex flex-col justify-center items-center`}>
          <div>ACT PCS</div>
          <div>(Order,Line)</div>
        </div>
      );
    },
    cell: (props) => {
      const value = props.getValue();
      const formatted =
        typeof value === "number"
          ? value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : "-";
      return <span class="flex justify-center items-center">{formatted}</span>;
    },
  }),
  columnHelper.accessor("workACL", {
    id: "workACL",
    header: () => {
      return (
        <div class={`flex flex-col justify-center items-center`}>
          <div>Work Minute</div>
          <div>(Order,Line)</div>
        </div>
      );
    },
    cell: (props) => {
      const value = props.getValue();
      const formatted =
        typeof value === "number"
          ? value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "-";
      return <span class="flex justify-center items-center">{formatted}</span>;
    },
  }),
  //   columnHelper.accessor("group", {
  //     header: () => <span>Group</span>,
  //     cell: (info) => <span class="font-bold">{info.getValue()}</span>,
  //   }),
];

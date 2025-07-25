<template>
  <div class="flex md:flex-row flex-col gap-2 mt-5">
    <div class="flex flex-col flex-1/3 gap-2 md:p-0 px-5">
      <div class="p-1">
        <div class="p-[2rem] bg-neutral-50 h-full rounded flex flex-col gap-3">
          <div class="flex flex-row justify-between items-center gap-4">
            <div
              class="w-full h-[60px] text-white text-3xl font-bold flex justify-center items-center rounded"
              :class="
                monitorRef?.minutePercent! < 35
                  ? 'bg-black'
                  : monitorRef?.minutePercent! < 57
                  ? 'bg-red-500'
                  : monitorRef?.minutePercent! < 65
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              "
            >
              {{
                (monitorRef?.minutePercent
                  ? Math.ceil(monitorRef.minutePercent * 100) / 100
                  : 0
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
              %
            </div>
          </div>
          <div class="flex flex-row justify-between items-center gap-1">
            <div
              class="w-full text-xs h-[40px] bg-green-700 text-white flex justify-center items-center rounded"
            >
              > 65%
            </div>
            <div
              class="w-full text-xs h-[40px] bg-yellow-600 text-white flex justify-center items-center rounded"
            >
              >57 - 65%
            </div>
            <div
              class="w-full text-xs h-[40px] bg-red-600 text-white flex justify-center items-center rounded"
            >
              35-57%
            </div>
            <div
              class="w-full text-xs h-[40px] bg-black/90 text-white flex justify-center items-center rounded"
            >
              < 35%
            </div>
          </div>
          <div class="flex flex-row justify-between items-center gap-4">
            <div class="text-amber-500 font-bold text-xl">Sewer</div>
            <div class="text-red-500 font-bold text-xl">
              {{ monitorRef?.sewerVal.toLocaleString() }}
            </div>
          </div>
          <div class="flex flex-row justify-between items-center gap-4">
            <div class="text-sky-500 font-bold text-xl">OT</div>
            <div class="text-red-500 font-bold text-xl">
              {{ monitorRef?.otVal.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

      <div class="p-1">
        <div class="p-[2rem] bg-neutral-50 h-full rounded flex flex-col gap-5">
          <div class="flex flex-row justify-between items-center gap-4">
            <div
              class="w-full h-[50px] flex flex-col justify-center items-center rounded gap-1.5"
            >
              <span class="text-sky-500 font-bold text-xl">Minute/Day</span>
              <span class="text-red-500 font-bold text-xl">
                {{ monitorRef?.minDayVal.toLocaleString() }}
              </span>
            </div>
            <div
              class="w-full h-[50px] flex flex-col justify-center items-center rounded gap-1.5"
            >
              <span class="text-green-500 font-bold text-xl"
                >Minute/Actual</span
              >
              <span class="text-sky-500 font-bold text-xl">{{
                Math.round(monitorRef?.minActVal ?? 0).toLocaleString()
              }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex flex-row justify-between items-center gap-4">
              <div class="text-green-600 font-bold text-xl">AVG SAM:</div>
              <div class="bg-amber-400 font-bold text-xl p-1 rounded">
                {{
                  monitorRef?.avgSam.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })
                }}
              </div>
            </div>
            <div class="flex flex-row justify-between items-center gap-4">
              <div class="text-red-600 font-bold text-xl">% Defect</div>
              <div class="font-bold text-xl">
                {{
                  monitorRef?.defectPercent.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-auto max-w-[900px] w-full">
      <div class="md:p-[1rem] bg-neutral-50 h-full rounded">
        <div class="w-full flex flex-col justify-between items-center h-full">
          <template v-if="isLoading">
            <div class="flex w-52 flex-col gap-4">
              <div class="skeleton h-64 w-full"></div>
              <div class="skeleton h-8 w-28"></div>
              <div class="skeleton h-8 w-full"></div>
              <div class="skeleton h-8 w-full"></div>
            </div>
          </template>
          <template v-else>
            <SuppervisorTable
              :datalist="data"
              :minute-percent="
                monitorRef?.minutePercent ? monitorRef?.minutePercent : 0
              "
            />
          </template>
          <div class="flex flex-col font-bold gap-2">
            <div class="flex flex-col">
              <div class="flex flex-row">
                <label class="text-lg">Select Line</label>
              </div>
              <div class="flex flex-row gap-4">
                <div class="flex flex-row justify-center items-center gap-1">
                  <label for="rad1">All</label>
                  <input
                    type="radio"
                    name="radio-1"
                    class="radio"
                    id="rad1"
                    value="All"
                    v-model="picked"
                  />
                </div>
                <div class="flex flex-row justify-center items-center gap-1">
                  <label for="rad2">Normal</label>
                  <input
                    type="radio"
                    name="radio-1"
                    class="radio"
                    id="rad2"
                    value="Normal"
                    v-model="picked"
                  />
                </div>
                <div class="flex flex-row justify-center items-center gap-1">
                  <label for="rad3">Sample</label>
                  <input
                    type="radio"
                    name="radio-1"
                    class="radio"
                    id="rad3"
                    value="Sample"
                    v-model="picked"
                  />
                </div>
              </div>
            </div>
            <fieldset class="fieldset">
              <legend>
                <label class="text-lg"> Company </label>
              </legend>
              <select v-model="choose" class="select">
                <option>YPT</option>
                <option>GNX</option>
              </select>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRef, watch, watchEffect } from "vue";
import SuppervisorTable from "./SuppervisorTable.vue";
import { GetSupMonitoringData } from "@/lib/api/monitoring";
import type { Monitor, SupervisorData } from "@/data/type";

const props = defineProps<{
  date: Date;
  monitor: Monitor | null;
  onRefresh: number;
}>();
const emit = defineEmits<{
  (e: "picked", value: string): void;
  (e: "choose", value: string): void;
}>();
const data = ref<SupervisorData[]>([]);
const isLoading = ref<boolean>(false);
const picked = ref("Normal");
const choose = ref("YPT");
const dateRef = toRef(props, "date");
const monitorRef = toRef(props, "monitor");
const onRefreshRef = toRef(props, "onRefresh");
let intervalId: ReturnType<typeof setInterval> | null = null;

const fetchSup = async (date: Date, mode: string, company: string) => {
  try {
    isLoading.value = true;
    const res = await GetSupMonitoringData(date, mode, company);

    data.value = res;
  } catch (err: any) {
    throw err;
  } finally {
    isLoading.value = false;
  }
};

const notloadfetchSup = async (date: Date, mode: string, company: string) => {
  try {
    const res = await GetSupMonitoringData(date, mode, company);

    data.value = res;
  } catch (err: any) {
    throw err;
  }
};
onMounted(() => {
  if (props.date && picked.value && choose.value) {
    fetchSup(props.date, picked.value, choose.value);
  }
});
onMounted(() => {
  notloadfetchSup(props.date, picked.value, choose.value); // ดึงทันทีรอบแรกก่อนรอ interval

  // เคลียร์ interval เดิมก่อน
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    notloadfetchSup(props.date, picked.value, choose.value);
  }, 120000); // 10 วินาที
});
onMounted(() => {
  emit("picked", picked.value);
  if (props.date && picked.value) {
    fetchSup(props.date, picked.value, choose.value);
  }
});
watch(picked, () => {
  emit("picked", picked.value);
  if (props.date && picked.value) {
    fetchSup(props.date, picked.value, choose.value);
  }
});

watchEffect(() => {
  emit("choose", choose.value);
  console.log(choose.value);
  if (props.date && picked.value && choose.value) {
    fetchSup(props.date, picked.value, choose.value);
  }
});

watch(dateRef, (newDate) => {
  if (newDate) {
    notloadfetchSup(newDate, picked.value, choose.value); // ดึงทันทีรอบแรกก่อนรอ interval

    // เคลียร์ interval เดิมก่อน
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      notloadfetchSup(newDate, picked.value, choose.value);
    }, 120000); // 10 วินาที
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
watch(dateRef, () => {
  if (props.date) {
    fetchSup(props.date, picked.value, choose.value);
  }
});

watch(onRefreshRef, () => {
  if (onRefreshRef) {
    if (props.date && picked.value && choose.value) {
      fetchSup(props.date, picked.value, choose.value);
    }
  }
});
</script>

<style scoped></style>

<template>
  <HeadSection v-model="selectedDate" @onRefresh="refresh()" />
  <div class="">
    <template v-if="selectedDate">
      <MonitorSection
        :date="selectedDate"
        :monitor="monitor"
        :onRefresh="refreshSignal"
        @picked="picked"
        @choose="choose"
      />
    </template>
    <template v-else> Loading </template>
    <!-- Table -->
    <div class="shadow-xl rounded mb-3 lg:p-6">
      <div class="h-[560px]">
        <template v-if="!isLoading">
          <Suspense>
            <TableSection :datalist="datalist" />
            <template #fallback> Loading... </template>
          </Suspense>
        </template>
        <template v-else>
          <div>is Loading...</div>
        </template>
      </div>
    </div>
    <!-- End Table -->
  </div>
</template>

<script setup lang="ts">
import { Calendar1Icon } from "lucide-vue-next";
import HeadSection from "./MonitoringComp/HeadSection.vue";
import MonitorSection from "./MonitoringComp/MonitorSection.vue";

import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import TableSection from "./MonitoringComp/TableSection.vue";
import { GetMonitoringData } from "@/lib/api/monitoring";
import { type Monitor, type ProductionData } from "@/data/type";
const isLoading = ref<boolean>(false);
const datalist = ref<ProductionData[]>([]);
const selectedDate = ref<Date | null>(null);
const monitor = ref<Monitor | null>(null);
let intervalId: ReturnType<typeof setInterval> | null = null;
const refreshSignal = ref(0);
const pickMode = ref<string>();
const chooseCompany = ref<string>();
const fetchDate = async (date: Date, mode: string, company: string) => {
  isLoading.value = true;
  try {
    const res = await GetMonitoringData(date, mode, company);
    datalist.value = res.results;
    monitor.value = res.monitor;
  } catch (err) {
    console.error("Failed to fetch:", err);
  } finally {
    isLoading.value = false;
  }
};
const notloadfetchDate = async (date: Date, mode: string, company: string) => {
  try {
    const res = await GetMonitoringData(date, mode, company);
    datalist.value = res.results;
    monitor.value = res.monitor;
  } catch (err) {
    console.error("Failed to fetch:", err);
  }
};
const refresh = () => {
  console.log("refresh");
  refreshSignal.value++;
  if (selectedDate.value != null && pickMode.value && chooseCompany.value) {
    fetchDate(selectedDate.value, pickMode.value, chooseCompany.value);
  }
};
const picked = (picked: string) => {
  console.log(picked);
  pickMode.value = picked;
};
const choose = (choose: string) => {
  console.log(choose);
  chooseCompany.value = choose;
};
onMounted(() => {
  if (selectedDate.value != null && pickMode.value && chooseCompany.value) {
    fetchDate(selectedDate.value, pickMode.value, chooseCompany.value);
  }
});
onMounted(() => {
  if (selectedDate.value != null && pickMode.value && chooseCompany.value) {
    notloadfetchDate(selectedDate.value, pickMode.value, chooseCompany.value); // ดึงทันทีรอบแรกก่อนรอ interval
  }

  // เคลียร์ interval เดิมก่อน
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    if (selectedDate.value != null && pickMode.value && chooseCompany.value) {
      notloadfetchDate(selectedDate.value, pickMode.value, chooseCompany.value); // ดึงทันทีรอบแรกก่อนรอ interval
    }
  }, 120000); // 10 วินาที
});
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  console.log("unmonth");
});
watchEffect(() => {
  if (selectedDate.value != null && pickMode.value && chooseCompany.value) {
    notloadfetchDate(selectedDate.value, pickMode.value, chooseCompany.value); // ดึงทันทีรอบแรกก่อนรอ interval
  }

  // เคลียร์ interval เดิมก่อน
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    if (selectedDate.value != null && pickMode.value && chooseCompany.value) {
      notloadfetchDate(selectedDate.value, pickMode.value, chooseCompany.value); // ดึงทันทีรอบแรกก่อนรอ interval
    }
  }, 120000); // 10 วินาที
});
// watch(selectedDate, () => {
//   if (selectedDate.value != null && pickMode.value && chooseCompany.value) {
//     fetchDate(selectedDate.value, pickMode.value, chooseCompany.value);
//   }
// });
watchEffect(() => {
  if (selectedDate.value != null && pickMode.value && chooseCompany.value) {
    fetchDate(selectedDate.value, pickMode.value, chooseCompany.value);
  }
});
</script>

<style scoped></style>

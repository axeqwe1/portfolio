<template>
  <div
    class="sticky top-0 z-30 flex flex-row justify-between items-center rounded shadow-md bg-neutral-100 p-5 gap-3"
  >
    <div
      class="font-bold text-xl flex flex-row justify-center items-center gap-3"
    >
      <span class="flex flex-row justify-center items-center gap-2">
        <button @click="onRefresh()">
          <Calendar1Icon class="text-sky-500 hover:cursor-pointer" />
        </button>

        <VueDatePicker
          v-model="date"
          auto-apply
          :enable-time-picker="false"
          @update:model-value="updateValue"
        />
      </span>
    </div>
    <div
      class="font-bold md:text-xl flex flex-row justify-center items-center gap-4"
    >
      YPT Downstream Monitor
      <button @click="signout()" class="btn btn-error w-[30px] h-[30px]">
        <span class="text-white"><IconLogout size="20px" /></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Calendar1Icon } from "lucide-vue-next";
import { IconLogout } from "@tabler/icons-vue";
import { logout } from "@/lib/api/auth";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const date = ref(new Date());

const useUser = useUserStore();
const router = useRouter();
const emit = defineEmits<{
  (e: "update:modelValue", value: Date | null): void;
  (e: "onRefresh", value: void): void;
}>();

onMounted(() => {
  emit("update:modelValue", new Date());
});
function updateValue(value: Date | null) {
  emit("update:modelValue", value);
}
function onRefresh() {
  emit("onRefresh");
}
const signout = async () => {
  const res = await logout();
  if (res.status === 200) {
    useUser.setUser(null);
    router.replace("/login");
  }
};
</script>

<style scoped></style>

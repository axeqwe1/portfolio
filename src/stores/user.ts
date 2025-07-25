// stores/userStore.ts
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/data/type";
import { me } from "@/lib/api/auth";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const userName = computed(() => user.value?.fullname || "Guest");

  const isAuthenticated = computed(() => user.value !== null);

  const setUser = (data: User | null) => {
    user.value = data;
  };

  const clearUser = () => {
    user.value = null;
  };

  return {
    user,
    userName,
    isAuthenticated,
    setUser,
    clearUser,
  };
});

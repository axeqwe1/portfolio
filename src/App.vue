<template>
  <div class="justify-center items-center">
    <!-- <Navbar v-if="!hideNavbar" /> -->
    <div class="pt-[15px] h-full">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import Navbar from "./components/Navbar/Navbar.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useUserStore } from "./stores/user";
import { me } from "./lib/api/auth";

const route = useRoute();

const hideNavbar = computed(() => route.meta.hideNavbar === true);
</script>

<style scoped></style>

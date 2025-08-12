<template>
  <div class="justify-center items-center">
    <!-- <Navbar v-if="!hideNavbar" /> -->
    <div class="min-h-screen bg-white">
      <Header />
      <HomeView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import Header from "./components/Header.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useUserStore } from "./stores/user";
import { me } from "./lib/api/auth";
import HomeView from "./views/HomeView.vue";

const route = useRoute();
</script>

<style scoped></style>

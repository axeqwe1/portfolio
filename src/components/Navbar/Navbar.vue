<template>
  <div class="h-[15px]"></div>
  <div
    :class="{
      'bg-transparent': x > 75,
    }"
    class="p-[1rem] max-w-[1400px] rounded-full transition ease-in-out duration-100 bg-neutral-200"
  >
    <div class="w-full mx-auto">
      <div class="flex flex-row justify-between items-center">
        <div class="logo">
          <span class="text-2xl text-sky-400">LOGO</span>
        </div>
        <div class="list">
          <ul class="flex flex-row justify-center items-center gap-2">
            <li class="text-sky-400 hover:text-sky-400/50">
              <RouterLink to="/">
                <span class="font-bold">Home</span></RouterLink
              >
            </li>
            <li class="text-sky-400 hover:text-sky-400/50">
              <RouterLink to="/about">About</RouterLink>
            </li>
            <li class="text-sky-400 hover:text-sky-400/50">
              <RouterLink to="/dashboard">Dashboard</RouterLink>
            </li>
            <li class="text-sky-400 hover:text-sky-400/50">
              <RouterLink to="/">Test</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
const x = ref(window.scrollY);

window.addEventListener("scroll", () => {
  x.value = window.scrollY;
});

watch(x, (newX) => {
  console.log(newX);
});
</script>

<style scoped></style>

<template>
  <div class="flex flex-col items-center justify-center">
    <div>test</div>
    <div>count : {{ test.count }}</div>
    <div>double count : {{ test.doubleCount }}</div>
    <button class="btn btn-primary" @click="test.increment">Click</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCounterStore } from "../stores/counter";
const text = ref(0);
const test = useCounterStore();
</script>

<style scoped></style>

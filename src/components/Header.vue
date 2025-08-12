<template>
  <div
    class="fixed top-0 w-full backdrop-blur-md bg-white/80 border-b border-gray-100">
    <div class="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="w-full flex flex-row justify-between items-center">
        <div class="font-bold text-2xl text-cyan-700">Bunniphat</div>
        <div class="flex">
          <ul class="flex flex-row justify-center items-center gap-3">
            <li class="text-cyan-700 p-1 py-3 menu-list">
              <a href="#">Home</a>
            </li>
            <li class="text-cyan-700 p-1 py-3 menu-list">
              <a href="#">About</a>
            </li>
            <li class="text-cyan-700 p-1 py-3 menu-list">
              <a href="#">Skills</a>
            </li>
            <li class="text-cyan-700 p-1 py-3 menu-list">
              <a href="#">Projects</a>
            </li>
            <li class="text-cyan-700 p-1 py-3 menu-list">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.menu-list {
  position: relative;
  display: inline-block; /* ให้ความกว้างพอดีกับเนื้อหา */

  transition: 500ms ease-in-out;
}
.menu-list::after {
  content: "";
  position: absolute;
  width: 0; /* เริ่มจากความกว้าง 0 */
  height: 3px;
  background: cyan;
  bottom: 0;
  left: 0;
  transition: width 0.2s ease-in-out; /* Animation ระยะเวลา 0.5 วินาที */
}

.menu-list:hover::after {
  width: 100%; /* ขยายเต็มความกว้างเมื่อ hover */
}
</style>

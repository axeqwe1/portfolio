<template>
  <div class="h-screen w-full">
    <div
      class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex flex-col gap-3 justify-center items-center">
      <div>
        <div class="p-1 rounded-full bg-gray-300 relative shadow-xl">
          <img
            src="/7498976_33290.jpg"
            alt="Profile"
            class="rounded-full object-cover w-24 h-24" />
        </div>
      </div>
      <div class="flex flex-col md:gap-6 gap-1">
        <span class="text-3xl md:text-6xl font-semibold"
          >Hi, I'm
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >Bunniphat Lueangaram
          </span>
        </span>
        <mute class="text-xl md:text-2xl"
          >I'm a passionate Full Stack Developer create Web Application with
          modern technologies and innovative solutions.</mute
        >
        <div class="flex flex-row justify-center items-center gap-2">
          <button
            class="btn p-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition-all duration-300">
            View My Work
          </button>
          <button
            class="btn p-5 rounded-full bg-white border-2 hover:border-cyan-700 hover:text-cyan-700">
            Contact Me
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

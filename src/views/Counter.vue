<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
const decrement = () => {
  count.value--
}
const reset = () => {
  count.value = 0
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
      <p class="text-xl font-bold">COUNTER</p>
      <div :class="{ negativeColor: count < 0 }" class="text-5xl font-bold text-gray-800">
        {{ count }}
      </div>

      <div class="flex justify-center gap-3">
        <button
          @click="increment"
          class="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-5 py-2 rounded-lg transition"
        >
          Increment
        </button>

        <button
          @click="decrement"
          class="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-5 py-2 rounded-lg transition"
        >
          Decrement
        </button>

        <button
          @click="reset"
          class="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-5 py-2 rounded-lg transition"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.negativeColor {
  color: red;
}
</style>

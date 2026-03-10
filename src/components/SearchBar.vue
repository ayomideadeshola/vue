<script setup>
import { ref } from "vue"

const emit = defineEmits(["search"])

const username = ref("")

const handleSearch = () => {
    emit("search", username.value)
}
</script>

<template>
    <div class="flex gap-2 mb-6">
        <input v-model="username" placeholder="Enter GitHub username" class="flex-1 border p-2 rounded" />

        <button @click="handleSearch" class="bg-black text-white px-4 py-2 rounded">
            Search
        </button>
    </div>
</template>
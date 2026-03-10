<script setup>
defineProps(["repos"])
</script>

<template>
    <div>

        <div v-for="repo in repos" :key="repo.id" class="border p-3 rounded mb-3">
            <h3 class="font-semibold">{{ repo.name }}</h3>
            <p class="text-sm text-gray-500">{{ repo.description }}</p>
        </div>
    </div>
</template>
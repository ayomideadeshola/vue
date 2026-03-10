<script setup>
defineProps(["user"])
</script>

<template>
    <div v-if="user" class="shadow rounded p-4 mb-6">

        <div class="flex items-center gap-4">
            <img :src="user.avatar_url" class="w-16 h-16 rounded-full" />

            <div>
                <h2 class="text-lg font-bold">{{ user.name }}</h2>
                <p class="text-gray-500">@{{ user.login }}</p>
            </div>
        </div>

        <p class="mt-3">{{ user.bio }}</p>

        <div class="flex gap-6 mt-4 text-sm">
            <span>Repos: {{ user.public_repos }}</span>
            <span>Followers: {{ user.followers }}</span>
            <span>Following: {{ user.following }}</span>
        </div>

    </div>
</template>
<script setup>
import { posts } from '@/data/post';

</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Blog Posts</h1>

        <div v-for="post in posts" :key="post.id" class="border p-4 mb-4">
            <h2 class="text-xl font-semibold">{{ post.title }}</h2>

            <router-link :to="'/post/' + post.id" class="text-blue-500">
                Read More
            </router-link>
        </div>
    </div>
</template>
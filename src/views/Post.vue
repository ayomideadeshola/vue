<script setup>
import { useRoute } from "vue-router"
import { posts } from '@/data/post';

const route = useRoute()

const post = posts.find(p => p.id == route.params.id)
</script>

<template>
    <div class="p-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, ducimus nihil? Veniam minus libero itaque
        blanditiis cupiditate sit? Eligendi, enim non quo, cumque sequi eum fuga molestias repellendus laboriosam
        voluptatibus suscipit excepturi molestiae. Modi perferendis libero voluptate eum cupiditate! Explicabo?
        <h1 class="text-2xl font-bold">{{ post.title }}</h1>

        <p class="mt-4">{{ post.content }}</p>
    </div>
</template>
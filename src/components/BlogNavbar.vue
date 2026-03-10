<script setup>

</script>

<template>
    <div class="navbar bg-base-100 shadow-md">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">Blogs</a>
        </div>

        <div class="flex-none">
            <ul class="gap-6 flex justify-between menu menu-horizontal px-1">
                <router-link to="/blog">Home</router-link>
                <router-link to="/blog/about">About page</router-link>
                <router-link to="/blog" class="badge badge-primary badge-lg">
                </router-link>
            </ul>
        </div>
    </div>
</template>
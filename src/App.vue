<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useCartStore } from './stores/cart';


const route = useRoute();
const cartStore = useCartStore();
</script>

<template>
  <div>
    <nav v-if="!route.path.startsWith('/blog') && !route.path.startsWith('/post')"
      class="bg-gray-900 z-20 text-white fixed w-full p-4 flex gap-6">
      <div class="flex justify-between w-full">
        <div class="flex gap-6">
          <router-link to="/" class="hover:text-yellow-400">Counter</router-link>
          <router-link to="/product" class="hover:text-yellow-400">Product</router-link>
          <router-link to="/blog" class="hover:text-yellow-400">Blog</router-link>
        </div>
        <router-link to="/cart" class="font-bold text-md">CART:{{ cartStore.cartCount }}</router-link>
      </div>

    </nav>
    <router-view />
  </div>

</template>

<style scoped></style>

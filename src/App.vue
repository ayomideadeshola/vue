<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from './stores/cart';
import { useAuthStore } from "@/stores/auth"


const route = useRoute();
const cartStore = useCartStore();

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
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
          <router-link to="/weather-app" class="hover:text-yellow-400">Weather-App</router-link>
          <router-link to="/github" class="hover:text-yellow-400">Github-Finder</router-link>
        </div>

        <div class="flex items-center gap-4">
          <router-link to="/cart" class="text-md">CART: <b>({{ cartStore.cartCount }})</b></router-link>
          <button class="btn" popovertarget="popover-1" style="anchor-name:--anchor-1">
            Menu
          </button>
          <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm" popover id="popover-1"
            style="position-anchor:--anchor-1">
            <li>
              <div v-if="authStore.isLoggedIn" class="grid grid-cols-1 items-center gap-4">
                <span class="text-sm text-white">{{ authStore.currentUser.name }}</span>
                <button @click="handleLogout" class="btn w-full btn-sm btn-outline">
                  Logout
                </button>
              </div>
              <div v-else class="grid grid-cols-1 w-full items-center gap-2">
                <router-link to="/login" class="btn w-full btn-sm btn-primary">
                  Login
                </router-link>
                <router-link to="/register" class="btn w-full btn-sm btn-ghost">
                  Register
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </nav>
    <router-view />
  </div>

</template>

<style scoped></style>

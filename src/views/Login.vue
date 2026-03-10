<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = () => {
    errorMessage.value = ''

    if (!email.value || !password.value) {
        errorMessage.value = 'Email and password are required'
        return
    }

    const result = authStore.login(email.value, password.value)
    if (result.success) {
        email.value = ''
        password.value = ''
        const redirect = route.query.redirect || '/product'
        router.push(redirect)
    } else {
        errorMessage.value = result.message
    }
}
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

            <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="login" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Email</label>
                    <input v-model="email" type="email" placeholder="Enter your email"
                        class="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>

                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Password</label>
                    <input v-model="password" type="password" placeholder="Enter your password"
                        class="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>

                <button type="submit"
                    class="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition duration-200">
                    Login
                </button>
            </form>

            <p class="text-center text-gray-600 mt-4">
                Don't have an account?
                <router-link to="/register" class="text-indigo-600 font-semibold hover:underline">Register</router-link>
            </p>
        </div>
    </div>
</template>

<style scoped></style>

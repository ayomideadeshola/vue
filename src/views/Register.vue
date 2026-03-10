<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const register = () => {
    errorMessage.value = ''
    successMessage.value = ''

    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        errorMessage.value = 'All fields are required'
        return
    }

    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match'
        return
    }

    if (password.value.length < 6) {
        errorMessage.value = 'Password must be at least 6 characters'
        return
    }

    const result = authStore.register(email.value, password.value, name.value)
    if (result.success) {
        successMessage.value = result.message
        name.value = ''
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        setTimeout(() => {
            router.push('/login')
        }, 2000)
    } else {
        errorMessage.value = result.message
    }
}
</script>

<template>
    <div class="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>

            <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {{ successMessage }}
            </div>

            <form @submit.prevent="register" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Full Name</label>
                    <input v-model="name" type="text" placeholder="Enter your full name"
                        class="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>

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

                <div>
                    <label class="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                    <input v-model="confirmPassword" type="password" placeholder="Confirm your password"
                        class="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>

                <button type="submit"
                    class="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition duration-200">
                    Register
                </button>
            </form>

            <p class="text-center text-gray-600 mt-4">
                Already have an account?
                <router-link to="/login" class="text-indigo-600 font-semibold hover:underline">Login</router-link>
            </p>
        </div>
    </div>
</template>

<style scoped></style>

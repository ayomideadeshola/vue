<script setup>
import { ref, computed, onMounted } from "vue";

const cartItems = ref([])

onMounted(() => {
    const stored = localStorage.getItem("cart")

    if (stored) {
        cartItems.value = JSON.parse(stored).map(item => ({
            ...item,
            price: Number(item.price),
            quantity: Number(item.quantity) || 1
        }))
    } else {
        cartItems.value = []
    }
})

function save() {
    localStorage.setItem("cart", JSON.stringify(cartItems.value))
}

function increment(item) {
    const target = cartItems.value.find(i => i.id === item.id)
    if (target) {
        target.quantity++
        save()
    }
}

function decrement(item) {
    const target = cartItems.value.find(i => i.id === item.id)
    if (target && target.quantity > 1) {
        target.quantity--
        save()
    }
}

const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) =>
        sum + item.price * item.quantity, 0)
)

const shipping = computed(() =>
    subtotal.value >= 100 ? 0 : 9.99
)

const tax = computed(() =>
    subtotal.value * 0.08
)

const total = computed(() =>
    subtotal.value + shipping.value + tax.value
)
</script>
<template>
    <div class="min-h-screen bg-gray-50 p-6">

        <h1 class="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        <div class="flex flex-col lg:flex-row gap-6">

            <div class="flex-1 flex flex-col gap-4">

                <div v-if="cartItems.length === 0" class="bg-white rounded-lg p-12 text-center text-gray-400">
                    <p class="text-lg font-medium">Your cart is empty</p>
                </div>

                <div v-for="item in cartItems" :key="item.id"
                    class="bg-white rounded-xl p-4 flex gap-4 items-center shadow hover:shadow-md transition">
                    <img :src="item.image" :alt="item.title" class="w-20 h-20 object-contain bg-gray-100 p-2 rounded" />

                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800 line-clamp-2">{{ item.title }}</p>
                        <p class="text-xs text-gray-400 mt-1">⭐{{ item.rating.rate }} ({{ item.rating.count }})</p>
                        <p class="text-sm font-bold text-gray-700 mt-1">${{ Number(item.price).toFixed(2) }}</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <button @click="decrement(item)"
                            class="w-8 h-8 rounded border cursor-pointer text-gray-400 flex items-center justify-center hover:bg-gray-100">−</button>
                        <span class="w-6 text-center text-gray-400 text-sm font-medium">{{ item.quantity }}</span>
                        <button @click="increment(item)"
                            class="w-8 h-8 rounded text-gray-400 cursor-pointer border flex items-center justify-center hover:bg-gray-100">+</button>
                    </div>

                    <p class="w-20 text-right text-sm font-bold text-gray-800">${{ (Number(item.price) *
                        Number(item.quantity)).toFixed(2) }}</p>

                </div>
            </div>

            <div class="w-full lg:w-72 bg-white rounded-lg p-6 shadow-sm h-fit">
                <h2 class="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

                <div class="flex flex-col gap-3 text-sm text-gray-600 mb-4">
                    <div class="flex justify-between">
                        <span>Subtotal</span>
                        <span>${{ subtotal.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Shipping</span>
                        <span :class="shipping === 0 ? 'text-green-500 font-medium' : ''">
                            {{ shipping === 0 ? 'Free' : '$' + shipping.toFixed(2) }}
                        </span>
                    </div>
                    <div class="flex justify-between">
                        <span>Tax (8%)</span>
                        <span>${{ tax.toFixed(2) }}</span>
                    </div>
                </div>

                <div class="border-t pt-4 flex justify-between font-bold text-gray-800 text-base mb-5">
                    <span>Total</span>
                    <span>${{ (total.toFixed(2)) }}</span>
                </div>

                <p v-if="shipping > 0" class="text-xs text-blue-500 mb-4">
                    Add ${{ (100 - subtotal).toFixed(2) }} more for free shipping
                </p>

                <button :disabled="cartItems.length === 0"
                    class="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-semibold py-3 rounded-lg transition">
                    Checkout
                </button>
            </div>

        </div>
    </div>
</template>
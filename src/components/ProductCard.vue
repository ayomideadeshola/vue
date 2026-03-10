<script setup>
import { useCartStore } from "@/stores/cart"

const props = defineProps(["productdetails"])

const cartStore = useCartStore()

const addToCart = () => {
    cartStore.addToCart(props.productdetails)
}

const removeFromCart = () => {
    cartStore.removeFromCart(props.productdetails.id)
}
</script>

<template>
    <div class="card w-full shadow">
        <div>
            <figure>
                <img :src="productdetails.image" class="h-50 mx-auto " alt="
                product-image" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">{{ productdetails.title }}</h2>
                <p>{{ productdetails.description }}</p>
                <div class="card-actions justify-end items-center">
                    <p class="text-xl text-gray-500">${{ productdetails.price }}</p>
                    <button @click="addToCart" class="btn btn-primary">Add to cart</button>
                    <button @click="removeFromCart" class="btn btn-error">Remove</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
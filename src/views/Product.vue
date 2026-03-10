<script setup>
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const dataStore = useProductStore();
const { products, isLoading } = storeToRefs(dataStore);
onMounted(() => {
    dataStore.getAllProduct()
})

</script>

<template>
    <div v-if="isLoading" class="flex items-center h-screen justify-center gap-2">
        <span class="block w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:0s]"></span>
        <span class="block w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]"></span>
        <span class="block w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.30s]"></span>
        <span class="block w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.45s]"></span>
    </div>
    <div v-show="!isLoading" class="px-4">
        <div class="grid grid-cols-3 pt-20">
            <ProductCard class="mx-auto" v-for="(items, index) in products" :key="index" :productdetails="items" />
        </div>
    </div>
</template>

<style></style>
import axios from 'axios'
import { defineStore } from 'pinia'

const url = `https://fakestoreapi.com/products`

export const useProductStore = defineStore('productStore', {
  state: () => {
    return {
      products: [],
      isLoading: false,
    }
  },

  actions: {
    async getAllProduct() {
      this.isLoading = true
      try {
        const res = await axios.get(url)
        this.products = res.data
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        setTimeout(() => {
          this.isLoading = false
        }, 3000)
      }
    },
  },
})

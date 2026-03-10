import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  }),

  getters: {
    cartCount: (state) => state.cart.length,
  },

  actions: {
    addToCart(product) {
      this.cart.push(product)
      this.saveCart()
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id)
      this.saveCart()
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
  },
})

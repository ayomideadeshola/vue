import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    users: JSON.parse(localStorage.getItem('users')) || [],
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null,
    currentUser: (state) => state.user,
  },

  actions: {
    register(email, password, name) {
      const userExists = this.users.find((u) => u.email === email)
      if (userExists) {
        return { success: false, message: 'User already exists' }
      }

      const newUser = {
        id: Date.now(),
        email,
        password,
        name,
      }

      this.users.push(newUser)
      localStorage.setItem('users', JSON.stringify(this.users))
      return { success: true, message: 'Registration successful' }
    },

    login(email, password) {
      const user = this.users.find((u) => u.email === email && u.password === password)
      if (!user) {
        return { success: false, message: 'Invalid email or password' }
      }

      this.user = user
      localStorage.setItem('user', JSON.stringify(this.user))
      return { success: true, message: 'Login successful' }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
})

import { createRouter, createWebHistory } from 'vue-router'
import Counter from '@/views/Counter.vue'
import Product from '@/views/Product.vue'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'
import About from '@/views/About.vue'
import Blog from '@/views/Blog.vue'
import Cart from '@/views/Cart.vue'
import Weather from '@/views/Weather.vue'
import GitHub from '@/views/GitHub.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Counter },
    { path: '/product', component: Product },
    { path: '/cart', component: Cart },
    { path: '/weather-app', component: Weather },
    { path: '/github', component: GitHub },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/blog',
      component: Blog,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: 'about',
          component: About,
        },
        {
          path: '/post/:id',
          component: Post,
        },
      ],
    },
  ],
})

// Route guard to check authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // List of protected routes
  const protectedRoutes = ['/checkout']
  
  if (protectedRoutes.includes(to.path) && !authStore.isLoggedIn) {
    next(`/login?redirect=${to.path}`)
  } else {
    next()
  }
})

export default router

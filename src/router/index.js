import { createRouter, createWebHistory } from 'vue-router'
import Counter from '@/views/Counter.vue'
import Product from '@/views/Product.vue'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'
import About from '@/views/About.vue'
import Blog from '@/views/Blog.vue'
import Cart from '@/views/Cart.vue'
import Weather from '@/views/Weather.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Counter },
    { path: '/product', component: Product },
    { path: '/cart', component: Cart },
    { path: '/weather-app', component: Weather },
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

export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/auth',
      name: 'Автор',
      component: () => import('@/views/AuthView.vue'),
      children: [
        {
          path: '/auth/login',
          name: 'Авторизация',
          component: () => import('@/components/LoginForm.vue'),
          meta: { requiresAuth: false },
        },
        {
          path: '/auth/register',
          name: 'Регистрация',
          component: () => import('@/components/RegisterForm.vue'),
          meta: { requiresAuth: false },
        },
      ]
    },
    {
      path: '/cart',
      name: 'Корзина',
      component: () => import('@/views/CartView.vue'),
      meta: { requiresAuth: true },
    },
  ],

})

export default router

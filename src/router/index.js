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
          meta: { title: 'Авторизация' },
        },
        {
          path: '/auth/register',
          name: 'Регистрация',
          component: () => import('@/components/RegisterForm.vue'),
          meta: { title: 'Регистрация' },
        },
      ]
    },

    {
      path: '/cart',
      name: 'Корзина',
      component: () => import('@/views/CartView.vue'),
    },
  ],

})

export default router

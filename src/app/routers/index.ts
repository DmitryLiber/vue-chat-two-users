import { createRouter, createWebHistory } from 'vue-router'

const routers = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@pages/ui').then(({ ChatPage }) => ChatPage)
    }
  ]
})

export default routers

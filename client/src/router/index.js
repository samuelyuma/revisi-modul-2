import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import CategoryPage from '../views/CategoryPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ // Navigation ✅
    {
      path: '/', 
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/category/:categoryName',
      name: 'category',
      component: CategoryPage,
    },
    {
      path:  '/:pathMatch(.*)*', // 404 Not Found ✅ 
      name:  'NotFound',
      component: NotFoundPage,
    },
  ],
});

export default router;

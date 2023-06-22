import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RatingView from'../views/RatingView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/Rating',
    name: 'Rating',
    component: RatingView,
  },
  // Other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

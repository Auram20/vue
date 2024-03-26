// router.js
import { createRouter, createWebHistory } from 'vue-router';
import FetchScenes from './components/FetchScenes.vue';

const routes = [
  {
    path: '/',
    name: 'FetchScenes',
    component: FetchScenes
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

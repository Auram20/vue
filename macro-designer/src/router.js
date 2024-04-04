import { createRouter, createWebHistory } from 'vue-router';
import MacroList from './components/MacroList.vue';
import MacroForm from './components/MacroForm.vue';

const routes = [
  { path: '/', component: MacroList },
  { path: '/edit/:id', component: MacroForm, props: true },
  { path: '/add', component: MacroForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

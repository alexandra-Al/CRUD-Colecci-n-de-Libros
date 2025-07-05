import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';


const routes = [
  {
    path: '/',
    redirect: '/books'
  },
  {
    path: '/books',
    name: 'BookList',
    component: defineAsyncComponent(() => import('@/pages/BookListPage.vue')),
  },
  {
    path: '/books/new',
    name: 'BookNew',
    component: defineAsyncComponent(() => import('@/pages/BookFormPage.vue')),
  },
  {
    path: '/books/:id',
    name: 'BookEdit',
    component: defineAsyncComponent(() => import('@/pages/BookFormPage.vue')),
  },
  {
  path: '/stats',
  name: 'Stats',
  component: defineAsyncComponent(() => import('@/pages/StatsPage.vue')),
},

];


const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;

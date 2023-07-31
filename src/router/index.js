import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogsView from '../views/BlogsView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ProfileView from '../views/ProfileView.vue';
import AdminView from '../views/AdminView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: BlogsView,
      meta: {
        title: 'Blogs'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: 'login'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: 'Forgot Password'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      meta: {
        title: 'Profile'
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
      meta: {
        title: 'Admin'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
});
export default router;

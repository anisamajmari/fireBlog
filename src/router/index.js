import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogsView from '../views/BlogsView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ProfileView from '../views/ProfileView.vue';
import AdminView from '../views/AdminView.vue';
import CreatePost from '../views/CreatePost.vue';
import BlogPreview from '../views/BlogPreview.vue';
import EditBlog from '../views/EditBlog.vue';
import ViewBlog from '../views/ViewBlog.vue';
import { auth } from '../firebase/firebaseInit';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Home',
        requiresAuth: false
      }
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: BlogsView,
      meta: {
        title: 'Blogs',
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: 'login',
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: {
        title: 'Register',
        requiresAuth: false
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: 'Forgot Password',
        requiresAuth: false
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      meta: {
        title: 'Profile',
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
      meta: {
        title: 'Admin',
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      component: CreatePost,
      meta: {
        title: 'Create Post',
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/post-preview',
      name: 'BlogPreview',
      component: BlogPreview,
      meta: {
        title: 'Blog Peview',
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/view-Blog/:blogid',
      name: 'ViewBlog',
      component: ViewBlog,
      meta: {
        title: 'View Blog Post',
        requiresAuth: false
      }
    },
    {
      path: '/edit-Blog/:blogid',
      name: 'EditBlog',
      component: EditBlog,
      meta: {
        title: 'Edit Blog Post',
        requiresAuth: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
});

router.beforeEach(async (to, from, next) => {
  let user = auth.currentUser;
  let admin = null;
  if (user) {
    let token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: 'Home' });
      }
      return next();
    }
    return next({ name: 'Home' });
  }
  return next();
});
export default router;

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from './LoginView.vue'
import LogoutView from './LogoutView.vue'
import FirebaseSigninView from './FirebaseSigninView.vue'
import FirebaseRegisterView from './FirebaseRegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      // Perform logic before entering the About route
      if (localStorage.getItem('isAuthenticated')) {
        next()
      } else {
        window.alert('Please login first. ')
        next(false) // Cancel the navigation
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // This route requires authentication
      if (!isLoggedIn) {
        // If not logged in, redirect to login page
        next({ name: 'Login' });
      } else {
        // Proceed to the route
        next();
      }
    } else {
      // Route does not require authentication, proceed
      next();
    }
  });

export default router

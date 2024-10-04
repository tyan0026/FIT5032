import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './homeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from './LoginView.vue'
import LogoutView from './LogoutView.vue'
import FirebaseSigninView from './FirebaseSigninView.vue'
import FirebaseRegisterView from './FirebaseRegisterView.vue'
import FirebaseLogoutView from './FirebaseLogoutView.vue'
import AddBookView from './AddBookView.vue'
import GetBookCountView from './GetBookCountView.vue'
import WeatherView from './WeatherView.vue'
import CountBookAPI from './CountBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
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
    path: '/FireLogout',
    name: 'FireLogout',
    component: FirebaseLogoutView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
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

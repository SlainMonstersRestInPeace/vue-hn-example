import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '../views/NotFound'
import HNNews from '../views/HNNews'
import HNNewest from '../views/HNNewest'
import HNPast from '../views/HNPast'
import HNComments from '../views/HNComments'
import HNAsk from '../views/HNAsk'
import HNShow from '../views/HNShow'
import HNJobs from '../views/HNJobs'

const routes = [
  {
    path: '/',
    redirect: '/news'
  },
  {
    name: "News",
    path: '/news',
    component: HNNews,
    props(route) {
      return {
        page: +route.query.page - 1
      }
    }
  },
  {
    name: "New",
    path: '/newest',
    component: HNNewest,
    props(route) {
      return {
        page: +route.query.page - 1
      }
    }
  },
  {
    name: "Past",
    path: '/past',
    component: HNPast,
    props(route) {
      return {
        page: +route.query.page - 1
      }
    }
  },
  {
    name: "Comments",
    path: '/comments',
    component: HNComments,
    props(route) {
      return {
        page: +route.query.page - 1
      }
    }
  },
  {
    name: "Ask",
    path: '/ask',
    component: HNAsk,
    props(route) {
      return {
        page: +route.query.page - 1
      }
    }
  },
  {
    name: "Show",
    path: '/show',
    component: HNShow,
    props(route) {
      return {
        page: +route.query.page - 1
      }
    }
  },
  {
    name: "Jobs",
    path: '/jobs',
    component: HNJobs,
    props(route) {
      return {
        page: +route.query.page - 1
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

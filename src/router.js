import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './utils/auth.guard'
import { adminRoot } from './constants/config'
import { UserRole } from './utils/auth.roles'

Vue.use(VueRouter)

const routes = [
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ './views/app'),
    redirect: `${adminRoot}/`,
    meta: { loginRequired: true },
    /*
   define with Authorization :
   meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
   */
    children: [
      {
        path: '/app',
        component: () =>
          import(/* webpackChunkName: "piaf" */ './views/app/piaf'),
        redirect: `${adminRoot}/piaf/start`,
        children: [
          {
            path: '/',
            component: () =>
              import(
                /* webpackChunkName: "piaf" */ './views/app/piaf/FlipCardsIndex.vue'
              )
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: '/question',
            component: () =>
              import(
                /* webpackChunkName: "user" */ './views/app/questionMode/CardsQuestionMode.vue'
              )
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          }
        ]
      }
    ]
  },
  {
    path: '/error',
    component: () => import(/* webpackChunkName: "error" */ './views/Error')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ './views/user/Login')
      },
      {
        path: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ './views/user/Register')
      },
      {
        path: 'forgot-password',
        component: () =>
          import(/* webpackChunkName: "user" */ './views/user/ForgotPassword')
      },
      {
        path: 'reset-password',
        component: () =>
          import(/* webpackChunkName: "user" */ './views/user/ResetPassword')
      }
    ]
  },

  {
    path: '*',
    component: () => import(/* webpackChunkName: "error" */ './views/Error')
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})
router.beforeEach(AuthGuard)
export default router

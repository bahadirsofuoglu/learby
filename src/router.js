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
        path: `${adminRoot}`,
        component: () =>
          import(/* webpackChunkName: "piaf" */ './views/app/index'),
        redirect: `${adminRoot}/flipMode`,
        children: [
          {
            path: `${adminRoot}/flipMode`,
            component: () =>
              import(
                /* webpackChunkName: "piaf" */ './views/app/index/FlipCardsIndex.vue'
              )
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: `${adminRoot}/questions`,
            component: () =>
              import(
                /* webpackChunkName: "user" */ './views/app/questionMode/CardsQuestionMode.vue'
              )
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: `${adminRoot}/categories`,
            component: () =>
              import(
                /* webpackChunkName: "user" */ './views/app/category/CategoryEdit.vue'
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
    path: '/',
    component: () => import(/* webpackChunkName: "user" */ './views/auth'),
    redirect: '/',
    children: [
      {
        path: '/',
        component: () =>
          import(/* webpackChunkName: "user" */ './views/auth/Login')
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

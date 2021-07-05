import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/middle',
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: '/middle',
    component: () => import('../views/Middle.vue'),
  },
  {
    path: '/biz',
    component: () => import('../components/BizLayout.vue'),
    children: [
      {path: 'index', component: () => import('../views/biz/BizComponent.vue')},
      {path: 'members', component: () => import('../views/biz/BizMembers.vue')},
      {path: 'host-details', component: () => import('../views/biz/BizHostDetails.vue')},
      {path: 'set-information', component: () => import('../views/biz/BizSetInformation.vue')},
      {path: 'app-settings', component: () => import('../views/biz/BizSetApp.vue')},
    ],
  },
  {
    path: '/app/:appId',
    component: () => import('../components/AppLayout.vue'),
    children: [
      {path: 'index', component: () => import('../views/app/AppComponent.vue')},
      {path: 'members', component: () => import('../views/app/AppMembers.vue')},
      {path: 'set-information', component: () => import('../views/app/AppSetInformation.vue')},
      {path: 'set-cluster', component: () => import('../views/app/AppSetCluster.vue')},
      {path: 'set-cluster/edit/:clusterId', component: () => import('../views/app/AppSetClusterEdit.vue')},
      {path: 'set-cluster/instance/:clusterId', component: () => import('../views/app/AppClusterInstance.vue')},
      {path: 'host-details', component: () => import('../views/app/AppHostDetails.vue')},
      {path: 'host-details/instance/:hostId', component: () => import('../views/app/AppHostInstance.vue')},
    ],
  },
  {
    path: '/:pathMatch(,*)*',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


const routes = [
  {
    path: "/",
    component: () => import("pages/Login.vue"),
    name: "login"
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/dataentry', component: () => import('pages/dataentry.vue') },
      { path: '/setting', component: () => import('pages/setting.vue') },
      { path: '/learning', component: () => import('pages/learning.vue') },
      { path: '/note', component: () => import('pages/releasenote.vue') },
      { path: '/simulation', component: () => import('pages/simulation.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

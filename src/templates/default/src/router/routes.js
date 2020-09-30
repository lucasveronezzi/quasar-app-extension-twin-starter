import { authRoutes /* prefixRoutes */ } from 'twin-starter/utils/router'

const routes = [
  {
    path: '/',
    component: () => import('layouts/app/AppLayout.vue'),
    meta: { auth: true },
    children: [

      // Is required to have a route with name 'home'
      { name: 'home', path: '', component: () => import('pages/Index.vue'), meta: { title: 'Home My' } }

      //
      // Example to how to use prefixRoutes
      // routes: /users - /user/create
      //
      // ...prefixRoutes('users', [
      //   { path: '', component: () => import('') },

      //   { path: 'create', component: () => import('') },
      // ])
      //

    ]
  },

  // If you want to add the auth routes manually, remove this line
  ...authRoutes,

  // Route when user is logged but doens't have permission
  // You can change the route path and component but DON'T CHANGE THE ROUTE NAME
  { name: 'notAllowed', path: '/not-allowed', component: () => import('pages/Error403') },

  // Always leave this as last one,
  // but you can also remove it
  { path: '*', component: () => import('pages/Error404.vue') }
]

export default routes

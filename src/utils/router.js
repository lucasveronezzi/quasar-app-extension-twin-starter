const prefixRoutes = function (prefix, routes) {
  return routes.map((route) => {
    route.path = prefix + '/' + route.path
    return route
  })
}

const authRoutes = []

if (process.env.TWIN_USE_MODULES) {
  authRoutes.push({
    path: '/',
    component: () => import('modules/Auth/layouts/AuthLayout'),
    meta: { auth: false },
    children: [
      { name: 'login', path: '/login', component: () => import('modules/Auth/pages/LoginPage') },

      { name: 'register', path: '/register', component: () => import('modules/Auth/pages/RegisterPage') },

      { name: 'forgotPassword', path: '/password/forget', component: () => import('modules/Auth/pages/ForgotPasswordPage') },

      { name: 'resetPassword', path: '/password/reset', component: () => import('modules/Auth/pages/ResetPasswordPage') }
    ]
  })
} else {
  authRoutes.push({
    path: '/',
    component: () => import('layouts/Auth/AuthLayout'),
    meta: { auth: false },
    children: [
      { name: 'login', path: '/login', component: () => import('pages/Auth/LoginPage') },

      { name: 'register', path: '/register', component: () => import('pages/Auth/RegisterPage') },

      { name: 'forgotPassword', path: '/password/forget', component: () => import('pages/Auth/ForgotPasswordPage') },

      { name: 'resetPassword', path: '/password/reset', component: () => import('pages/Auth/ResetPasswordPage') }
    ]
  })
}

export { prefixRoutes, authRoutes }

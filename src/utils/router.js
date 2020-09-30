const prefixRoutes = function (prefix, routes) {
  return routes.map((route) => {
    route.path = prefix + '/' + route.path
    return route
  })
}

const authRoutes = [{
  path: '/',
  component: () => import('layouts/auth/AuthLayout'),
  meta: { auth: false },
  children: [
    { name: 'login', path: '/login', component: () => import('pages/Auth/LoginPage') },

    { name: 'register', path: '/register', component: () => import('pages/Auth/RegisterPage') },

    { name: 'forgotPassword', path: '/password/forget', component: () => import('pages/Auth/ForgotPasswordPage') },

    { name: 'resetPassword', path: '/password/reset', component: () => import('pages/Auth/ResetPasswordPage') }
  ]
}]

export { prefixRoutes, authRoutes }

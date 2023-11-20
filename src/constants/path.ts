export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/changePassword',
  historyPurchase: '/user/historyPurchase'
} as const

export default path

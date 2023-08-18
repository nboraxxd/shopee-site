const PRODUCTS = '/products'
const USER = '/user'

export const PATH = {
  home: '/',
  products: PRODUCTS,
  productDetail: PRODUCTS + '/:id',
  login: '/login',
  signup: '/register',
  logout: '/logout',
  user: {
    index: USER,
    profile: USER + '/profile',
    password: USER + '/password',
    purchase: USER + '/purchase',
  },
  cart: '/cart',
} as const

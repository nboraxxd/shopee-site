const PRODUCTS = '/products'

export const PATH = {
  home: '/',
  products: PRODUCTS,
  productDetail: PRODUCTS + '/:id',
  login: '/login',
  signup: '/register',
  logout: '/logout',
  profile: '/profile',
} as const

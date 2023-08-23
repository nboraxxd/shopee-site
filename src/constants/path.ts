const PRODUCTS = '/products'
const USER = '/user'

export const PATH = {
  home: '/',
  products: PRODUCTS,
  productDetail: PRODUCTS + '/:id',
  login: '/login',
  register: '/register',
  logout: '/logout',
  user: {
    index: USER,
    profile: USER + '/profile',
    password: USER + '/password',
    purchase: USER + '/purchases',
  },
  cart: '/cart',
  notFound: '*',
} as const

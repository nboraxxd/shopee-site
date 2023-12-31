export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  order?: 'desc' | 'asc'
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  exclude?: string
  rating_filter?: number | string
  price_min?: number | string
  price_max?: number | string
  name?: string
  category?: string
}

export type SortT = Exclude<ProductListConfig['sort_by'], undefined>

export type OrderT = Exclude<ProductListConfig['order'], undefined>

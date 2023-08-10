import { Product, ProductList, ProductListConfig } from '@/types/product.type'
import { SuccessResponse } from '@/types/utils.type'
import { http } from '@/utils/http'

const PRODUCTS_URL = '/products'
const productsApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(PRODUCTS_URL, {
      params,
    })
  },

  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${PRODUCTS_URL}/${id}`)
  },
}

export default productsApi

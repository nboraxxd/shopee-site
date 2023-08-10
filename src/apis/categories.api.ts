import { Category } from '@/types/category.type'
import { SuccessResponse } from '@/types/utils.type'
import { http } from '@/utils/http'

const CATEGORIES_URL = '/categories'
const categoriesApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(CATEGORIES_URL)
  },
}

export default categoriesApi

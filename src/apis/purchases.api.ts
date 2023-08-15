import { http } from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { Purchase, PurchaseListStatus } from '@/types/purchase.type'

const PURCHASES_URL = '/purchases'
const purchasesApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${PURCHASES_URL}/add-to-cart`, body)
  },

  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(PURCHASES_URL, { params })
  },

  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${PURCHASES_URL}/buy-products`, body)
  },

  updatePurchases(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${PURCHASES_URL}/update-purchase`, body)
  },

  deletePurchases(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(PURCHASES_URL, {
      data: purchaseIds,
    })
  },
}

export default purchasesApi

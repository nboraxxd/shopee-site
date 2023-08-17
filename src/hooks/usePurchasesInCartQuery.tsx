import { useQuery } from '@tanstack/react-query'
import purchasesApi from '@/apis/purchases.api'
import { PurchaseListStatus } from '@/types/purchase.type'

export default function usePurchasesByStatus(purchaseStatus: PurchaseListStatus, enabled?: boolean) {
  return useQuery({
    queryKey: ['purchases', { status: purchaseStatus }],
    queryFn: () => purchasesApi.getPurchases({ status: purchaseStatus }),
    enabled: enabled ?? true,
  })
}

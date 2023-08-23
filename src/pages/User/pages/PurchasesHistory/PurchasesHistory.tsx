import { PATH } from '@/constants/path'
import PURCHASES_STATUS from '@/constants/purchase'
import usePurchasesByStatus from '@/hooks/usePurchasesInCartQuery'
import useQueryParams from '@/hooks/useQueryParams'
import { PurchaseListStatus } from '@/types/purchase.type'
import { formatCurrency, generateSlug } from '@/utils/utils'
import classNames from 'classnames'
import { Helmet } from 'react-helmet-async'
import { Link, createSearchParams, generatePath } from 'react-router-dom'

const PURCHASE_TABS = [
  { status: PURCHASES_STATUS.all, title: 'Tất cả' },
  { status: PURCHASES_STATUS.waitForConfirmation, title: 'Chờ xác nhận' },
  { status: PURCHASES_STATUS.waitForGetting, title: 'Chờ lấy hàng' },
  { status: PURCHASES_STATUS.inProgress, title: 'Đang giao' },
  { status: PURCHASES_STATUS.delivered, title: 'Hoàn thành' },
  { status: PURCHASES_STATUS.cancelled, title: 'Đã huỷ' },
]

export default function PurchasesHistory() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || PURCHASES_STATUS.all

  const purchasesQuery = usePurchasesByStatus(status as PurchaseListStatus)

  return (
    <>
      <Helmet>
        <title>Đơn hàng | Shopee clone</title>
        <meta name="description" content="Trang đơn hàng | Dự án Shopee Clone" />
      </Helmet>
      {/* Purchase Tabs */}
      <div className="sticky top-0 mt-3 flex rounded-t-sm text-[0.5rem] sm:text-xs md:mt-0 lg:text-sm">
        {PURCHASE_TABS.map((item) => (
          <Link
            key={item.status}
            to={{
              pathname: PATH.user.purchase,
              search: createSearchParams({
                status: String(item.status),
              }).toString(),
            }}
            className={classNames(
              'flex flex-1 items-center justify-center border-b-2 bg-white py-3 text-center md:py-4',
              {
                'border-b-primary/80 text-primary': status === item.status,
                'border-b-gray-200 text-gray-600': status !== item.status,
                'flex-[1.2] sm:flex-1':
                  PURCHASES_STATUS.waitForConfirmation === item.status ||
                  PURCHASES_STATUS.waitForGetting === item.status,
              }
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {/* End Purchase Tabs */}
      {/* Purchases List */}
      {purchasesQuery.data?.data.data.map((purchase) => {
        const productDetailPath = generatePath(PATH.productDetail, {
          id: generateSlug({ name: purchase.product.name, id: purchase.product._id }),
        })
        return (
          <div key={purchase._id} className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-600 shadow-sm">
            <Link to={productDetailPath} className="flex">
              <div className="shrink-0">
                <img src={purchase.product.image} alt={purchase.product.name} className="h-20 w-20 object-cover" />
              </div>
              <div className="ml-3 grow">
                <p className="line-clamp-1">{purchase.product.name}</p>
                <p className="mt-3">x{purchase.buy_count}</p>
              </div>
              <div className="ml-3 flex shrink-0 self-center">
                <div className=" line-clamp-1 hidden max-w-[50%] text-sm text-gray-400 line-through sm:block">
                  <span>₫</span>
                  <span>{formatCurrency(purchase.price_before_discount)}</span>
                </div>
                <div className="ml-1 line-clamp-1 text-sm text-primary">
                  <span>₫</span>
                  <span>{formatCurrency(purchase.price)}</span>
                </div>
              </div>
            </Link>
            <div className="flex justify-end">
              <div className="flex items-center">
                <span>Thành tiền:</span>
                <div className="ml-4 text-xl text-primary">
                  <span>₫</span>
                  <span>{formatCurrency(purchase.price * purchase.buy_count)}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      {/* End Purchases List */}
    </>
  )
}

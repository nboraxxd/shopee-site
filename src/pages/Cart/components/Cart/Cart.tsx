import { useContext, useEffect, useId, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMutation } from '@tanstack/react-query'
import { Link, generatePath, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { useInView } from 'react-intersection-observer'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'

import usePurchasesByStatus from '@/hooks/usePurchasesInCartQuery'
import useHiddenScroll from '@/hooks/useHiddenScroll'
import { AppContext } from '@/contexts/app.context'
import { ExtendedPurchaseI, Purchase } from '@/types/purchase.type'
import { formatCurrency, generateSlug, sortProductsByLatestUpdate } from '@/utils/utils'
import purchasesApi from '@/apis/purchases.api'
import PURCHASES_STATUS from '@/constants/purchase'
import { PATH } from '@/constants/path'

import { QuantityController } from '@/components/QuantityController'
import { ButtonSelect, InputCheckbox } from '@/pages/Cart'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import noProduct from '@/assets/images/no-product-in-cart.png'

export default function Cart() {
  const [purchasesOriginal, setPurchasesOriginal] = useState<Purchase[]>([])
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  const { state: stateFromLocation } = useLocation()
  const typedStateFromLocation = stateFromLocation as { purchaseId: string } | null

  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

  const isAllChecked = useMemo(
    () => extendedPurchases.every((purchase) => purchase.checked === true),
    [extendedPurchases]
  )

  const checkedExtendedPurchases = useMemo(
    () => extendedPurchases.filter((item) => item.checked === true),
    [extendedPurchases]
  )

  const totalPayment = useMemo(
    () => checkedExtendedPurchases.reduce((result, current) => result + current.price * current.buy_count, 0),
    [checkedExtendedPurchases]
  )

  const totalSavings = useMemo(
    () =>
      checkedExtendedPurchases.reduce(
        (result, current) =>
          result + (current.price_before_discount * current.buy_count - current.price * current.buy_count),
        0
      ),
    [checkedExtendedPurchases]
  )

  const ModalId = useId()
  useHiddenScroll(isShowModal)

  const { ref, inView } = useInView({
    threshold: 1,
  })

  const purchasesInCartQuery = usePurchasesByStatus(PURCHASES_STATUS.inCart)
  const purchasesInCartData = purchasesInCartQuery.data?.data.data

  const updatePurchaseMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.updatePurchases(body),

    onSuccess: (response) => {
      setPurchasesOriginal((prev) =>
        prev.map((item) => {
          if (item._id === response.data.data._id) {
            return { ...item, buy_count: response.data.data.buy_count }
          }
          return item
        })
      )
      setExtendedPurchases((prev) =>
        prev.map((item) => {
          if (item._id === response.data.data._id) {
            return { ...item, buy_count: response.data.data.buy_count, disabled: false }
          }
          return item
        })
      )
    },

    onError: (error) => {
      console.log(error)
    },
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: (purchaseIds: string[]) => purchasesApi.deletePurchases(purchaseIds),
  })

  const buyPurchasesMutation = useMutation({
    mutationFn: (
      body: {
        product_id: string
        buy_count: number
      }[]
    ) => purchasesApi.buyProducts(body),
  })

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObj = keyBy(prev, '_id')

      return (
        purchasesInCartData?.map((purchase) => {
          if (typedStateFromLocation && purchase._id === typedStateFromLocation.purchaseId) {
            return { ...purchase, disabled: false, checked: true }
          }
          return { ...purchase, disabled: false, checked: extendedPurchasesObj[purchase._id]?.checked || false }
        }) || []
      )
    })
    setPurchasesOriginal(purchasesInCartData || [])
  }, [purchasesInCartData, setExtendedPurchases, typedStateFromLocation])

  function handleAllChecked() {
    setExtendedPurchases((purchases) => purchases.map((purchase) => ({ ...purchase, checked: !isAllChecked })))
  }

  useEffect(() => {
    return () => {
      window.history.replaceState(null, document.title)
    }
  }, [])

  function handleDeletePurchase(purchaseIds: string[]) {
    deletePurchasesMutation.mutate(purchaseIds, {
      onSuccess: () => {
        setExtendedPurchases((prev) => prev.filter((item) => !purchaseIds.includes(item._id)))
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  function handleShowModal() {
    if (checkedExtendedPurchases.length > 0) {
      setIsShowModal(true)
    } else {
      toast.warn('Vui lòng chọn sản phẩm')
    }
  }

  function handleConfirmDeletePurchases() {
    handleDeletePurchase(checkedExtendedPurchases.map((item) => item._id))
  }

  function handlebuyPurchases() {
    const PurchasesToBuy = checkedExtendedPurchases.map((item) => ({
      product_id: item.product._id,
      buy_count: item.buy_count,
    }))

    if (checkedExtendedPurchases.length > 0) {
      buyPurchasesMutation.mutate(PurchasesToBuy, {
        onSuccess: (response) => {
          const boughtPurchaseIds = PurchasesToBuy.map((item) => item.product_id)
          setExtendedPurchases((prev) => prev.filter((item) => !boughtPurchaseIds.includes(item.product._id)))
          toast.success(response.data.message)
        },
      })
    } else {
      toast.warn('Bạn vẫn chưa chọn sản phẩm nào để mua')
    }
  }

  return purchasesInCartData === undefined || purchasesInCartData.length === 0 ? (
    <div className="container">
      <div className="flex flex-col items-center pb-40 pt-32">
        <img src={noProduct} alt="not purchase" className="h-24 w-24 object-cover" />
        <div className="mt-5 font-medium text-gray-400">Giỏ hàng của bạn còn trống</div>
        <Link to={PATH.home}>
          <Button className="mt-5 rounded-sm px-11 py-2">MUA NGAY</Button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="bg-secondary py-3 md:py-8">
      {/* Cart Main */}
      <div className="container">
        {/* Table Header */}
        <div className="hidden grid-cols-11 items-center rounded-sm bg-white px-9 py-5 text-sm text-gray-500 shadow md:grid lg:grid-cols-12">
          {/* Header Main */}
          <div className="col-span-5 lg:col-span-6">
            <div className="flex items-center">
              {/* Input Checkbox */}
              <div className="mr-3 flex shrink-0 items-center justify-center">
                <InputCheckbox checked={isAllChecked} handleAllChecked={handleAllChecked} />
              </div>
              {/* End Input Checkbox */}
              <div className="grow text-gray-700">Sản phẩm</div>
            </div>
          </div>
          {/* End Header Main */}
          {/* Header Rest */}
          <div className="col-span-6">
            <div className="grid grid-cols-5 text-center">
              <div className="col-span-3 lg:col-span-2">Đơn giá</div>
              <div className="col-span-1">Số lượng</div>
              <div className="hidden lg:col-span-1 lg:block">Số tiền</div>
              <div className="col-span-1">Thao tác</div>
            </div>
          </div>
          {/* End Header Rest */}
        </div>
        {/* End Table Header */}
        {/* Table Data */}
        <div className="my-3 rounded-sm bg-white p-3 shadow md:px-5 md:py-7">
          {extendedPurchases.length > 0 &&
            sortProductsByLatestUpdate(extendedPurchases).map((purchase) => {
              const productDetailPath = generatePath(PATH.productDetail, {
                id: generateSlug({ name: purchase.product.name, id: purchase.product._id }),
              })

              function handleChecked(purchaseId: string) {
                return function (ev: React.ChangeEvent<HTMLInputElement>) {
                  setExtendedPurchases(
                    produce((draft) => {
                      ;(draft.find((item) => item._id === purchaseId) as ExtendedPurchaseI).checked = ev.target.checked
                    })
                  )
                }
              }

              function handleCartQuantity(productId: string, value: number, totalProductQuantity?: number) {
                const extendedPurchasesObj = keyBy(extendedPurchases, 'product._id')
                if (extendedPurchasesObj[productId].buy_count === totalProductQuantity) {
                  return toast.warn(`Mặt hàng này chỉ còn ${totalProductQuantity} sản phẩm`)
                }

                setExtendedPurchases(
                  produce((draft) => {
                    ;(draft.find((item) => item.product._id === productId) as ExtendedPurchaseI).disabled = true
                  })
                )

                updatePurchaseMutation.mutate({
                  product_id: productId,
                  buy_count: value,
                })
              }

              function handleTypeCartQuantity(productId: string) {
                return function (value: number) {
                  setExtendedPurchases(
                    produce((draft) => {
                      ;(draft.find((item) => item.product._id === productId) as ExtendedPurchaseI).buy_count = value
                    })
                  )
                }
              }

              return (
                <div
                  key={purchase._id}
                  className="block grid-cols-11 items-center rounded-sm border-b border-gray-200 bg-white p-0 py-3 text-xs text-gray-700 first:pt-0 last:border-b-0 last:pb-0 md:grid md:px-4 md:py-5 md:text-sm lg:grid-cols-12"
                >
                  {/* Data Main */}
                  <div className="col-span-5 lg:col-span-6">
                    <div className="flex items-center">
                      {/* Input Checkbox */}
                      <div className="mr-1.5 flex shrink-0 items-center justify-center md:mr-3">
                        <InputCheckbox
                          classNameInput="h-4 w-4 md:h-5 md:w-5"
                          classNameChecked="h-[0.7rem] w-[0.7rem] md:h-3.5 md:w-3.5"
                          checked={purchase.checked}
                          handleChecked={handleChecked(purchase._id)}
                        />
                      </div>
                      {/* End Input Checkbox */}
                      {/* Product */}
                      <div className="grow">
                        <div className="flex">
                          {/* Product Image */}
                          <Link to={productDetailPath} className="h-20 w-20 shrink-0">
                            <img
                              className="h-full w-full object-cover"
                              src={purchase.product.image}
                              alt={purchase.product.name}
                            />
                          </Link>
                          {/* End Product Image */}
                          {/* Product Name */}
                          <div className="grow pl-3 pr-1 md:pb-2 md:pt-1">
                            <Link to={productDetailPath} className="line-clamp-1 md:line-clamp-2">
                              {purchase.product.name}
                            </Link>
                            {/* Data Rest */}
                            <div className="block md:hidden">
                              {/* Unit Price */}
                              <div className="mt-2">
                                <span className="text-gray-400 line-through">
                                  ₫{formatCurrency(purchase.product.price_before_discount)}
                                </span>
                                <span className="ml-1.5 text-primary">₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                              {/* End Unit Price */}
                              {/* Quantity */}
                              <div className="mt-2">
                                <QuantityController
                                  value={purchase.buy_count}
                                  max={purchase.product.quantity}
                                  onDecrease={(value) => handleCartQuantity(purchase.product._id, value)}
                                  onIncrease={(value) =>
                                    handleCartQuantity(purchase.product._id, value, purchase.product.quantity)
                                  }
                                  onType={handleTypeCartQuantity(purchase.product._id)}
                                  onFocusOutInput={(value) => {
                                    const purchasesOriginalObj = keyBy(purchasesOriginal, '_id')
                                    if (value !== purchasesOriginalObj[purchase._id].buy_count) {
                                      handleCartQuantity(purchase.product._id, value)
                                    }
                                  }}
                                  disabled={purchase.disabled}
                                />
                              </div>
                              {/* End Quantity */}
                              {/* Actions */}
                              <div className="mt-2">
                                <ButtonSelect handleDeletePurchase={() => handleDeletePurchase([purchase._id])}>
                                  Xoá
                                </ButtonSelect>
                              </div>
                              {/* End Actions */}
                            </div>
                            {/* End Data Rest */}
                          </div>
                          {/* End Product Name */}
                        </div>
                      </div>
                      {/* End Product */}
                    </div>
                  </div>
                  {/* End Data Main */}
                  {/* Data Rest */}
                  <div className="hidden md:col-span-6 md:block">
                    <div className="grid grid-cols-5 items-center text-center">
                      {/* Unit Price */}
                      <div className="col-span-3 flex items-center justify-center lg:col-span-2">
                        <span className="text-gray-400 line-through">
                          ₫{formatCurrency(purchase.product.price_before_discount)}
                        </span>
                        <span className="ml-2 text-primary lg:ml-3">₫{formatCurrency(purchase.product.price)}</span>
                      </div>
                      {/* End Unit Price */}
                      {/* Quantity */}
                      <div className="col-span-1">
                        <QuantityController
                          classNameWrapper="justify-center"
                          value={purchase.buy_count}
                          max={purchase.product.quantity}
                          onDecrease={(value) => handleCartQuantity(purchase.product._id, value)}
                          onIncrease={(value) =>
                            handleCartQuantity(purchase.product._id, value, purchase.product.quantity)
                          }
                          onType={handleTypeCartQuantity(purchase.product._id)}
                          onFocusOutInput={(value) => {
                            const purchasesOriginalObj = keyBy(purchasesOriginal, '_id')
                            if (value !== purchasesOriginalObj[purchase._id].buy_count) {
                              handleCartQuantity(purchase.product._id, value)
                            }
                          }}
                          disabled={purchase.disabled}
                        />
                      </div>
                      {/* End Quantity */}
                      {/* Total Price */}
                      <div className="hidden text-primary lg:col-span-1 lg:block">
                        ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                      </div>
                      {/* End Total Price */}
                      {/* Actions */}
                      <div className="col-span-1">
                        <ButtonSelect
                          className="transition-all hover:text-primary/80"
                          handleDeletePurchase={() => handleDeletePurchase([purchase._id])}
                        >
                          Xoá
                        </ButtonSelect>
                      </div>
                      {/* End Actions */}
                    </div>
                  </div>
                  {/* End Data Rest */}
                </div>
              )
            })}
        </div>
        {/* End Table Data */}
      </div>
      {/* End Cart Main */}
      {/* Sticky CTA */}
      <div className="sticky bottom-0 z-10 md:container">
        <div
          className={classNames('flex items-center rounded-sm bg-white px-3 py-3 transition-all md:px-9 md:py-6', {
            shadow: inView,
            'shadow-[0px_-25px_32px_-23px_rgba(0,0,0,0.2)]': !inView,
          })}
        >
          <div className="flex shrink-0 items-center justify-center">
            <InputCheckbox
              classNameInput="h-4 w-4 md:h-5 md:w-5"
              classNameChecked="h-[0.7rem] w-[0.7rem] md:h-3.5 md:w-3.5"
              checked={isAllChecked}
              handleAllChecked={handleAllChecked}
            />
            <ButtonSelect className="text-[0.5rem] md:ml-3 md:text-base" handleAllChecked={handleAllChecked}>
              Chọn tất cả ({extendedPurchases.length})
            </ButtonSelect>
            <ButtonSelect className="ml-2 hidden md:block" handleShowModal={handleShowModal}>
              Xoá
            </ButtonSelect>
          </div>
          {isShowModal &&
            createPortal(
              <Modal
                ModalId={ModalId}
                setIsShowModal={setIsShowModal}
                handleConfirm={handleConfirmDeletePurchases}
                quantity={checkedExtendedPurchases.length}
              />,
              document.body
            )}
          <div className="ml-auto flex items-center">
            <div className="text-gray-700">
              <div className="flex items-center justify-end">
                <div className="hidden shrink-0 md:block">Tổng tiền ({checkedExtendedPurchases.length} sản phẩm):</div>
                <div className="block shrink-0 text-[0.625rem] md:hidden">Tổng tiền</div>
                <div className="ml-2 text-xs text-primary md:text-xl">₫{formatCurrency(totalPayment)}</div>
              </div>
              <div className="flex items-center justify-end text-[0.625rem] md:text-sm">
                <div className="text-gray-500">Tiết kiệm</div>
                <div className="ml-2 md:ml-4">₫{formatCurrency(totalSavings)}</div>
              </div>
            </div>
            <Button
              className="ml-2 mt-0 rounded-sm px-1 py-2 text-xs md:ml-4 md:px-2 md:py-4 md:text-base"
              onClick={handlebuyPurchases}
              disabled={buyPurchasesMutation.isLoading}
              isLoading={buyPurchasesMutation.isLoading}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
      <div ref={ref}></div>
      {/* End Sticky CTA */}
    </div>
  )
}

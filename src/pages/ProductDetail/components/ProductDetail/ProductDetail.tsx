import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { toast } from 'react-toastify'
import classNames from 'classnames'

import { useWindowSize } from '@/hooks/useWindowSize'
import usePurchasesByStatus from '@/hooks/usePurchasesInCartQuery'
import { AppContext } from '@/contexts/app.context'
import productsApi from '@/apis/products.api'
import purchasesApi from '@/apis/purchases.api'
import { calcDiscountPercentage, formatCurrency, formatNumberToSocialStyle, getIdFromSlug } from '@/utils/utils'
import { Product as ProductType, ProductListConfig } from '@/types/product.type'
import PARAMETER_KEY from '@/constants/parameter'
import PURCHASES_STATUS from '@/constants/purchase'
import { PATH } from '@/constants/path'

import { ProductSkeleton, Product } from '@/pages/ProductList'
import { NotFound } from '@/pages/NotFound'
import { ProductRating } from '@/components/ProductRating'
import { Button } from '@/components/Button'
import { QuantityController } from '@/components/QuantityController'

export type StateType = {
  redirect: string
}

export default function ProductDetail() {
  const { id: productSlug } = useParams()
  const id = getIdFromSlug(productSlug as string)

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isAuthenticated } = useContext(AppContext)

  const [currentImagesIndex, setCurrentImagesIndex] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const [buyCount, setBuyCount] = useState(1)
  const [isAddToCart, setIsAddToCart] = useState(false)
  const [isBuyNow, setIsBuyNow] = useState(false)

  const imageRef = useRef<HTMLImageElement>(null)
  const windowWidth = useWindowSize()

  const { data: productDetailData, isError } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productsApi.getProductDetail(id as string),
  })

  const product = productDetailData?.data.data

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentImagesIndex) : []),
    [currentImagesIndex, product]
  )

  const queryConfig: ProductListConfig = {
    [PARAMETER_KEY.page]: '1',
    [PARAMETER_KEY.limit]: '12',
    [PARAMETER_KEY.category]: product?.category._id,
  }

  const productsCategory = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productsApi.getProducts(queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product),
  })

  const purchasesInCartQuery = usePurchasesByStatus(PURCHASES_STATUS.inCart, isAuthenticated)
  const purchasesInCartData = purchasesInCartQuery.data?.data.data
  const purchaseInCartQty =
    purchasesInCartData?.find((purchase) => purchase.product._id === product?._id)?.buy_count ?? 0

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.addToCart(body),
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  useEffect(() => {
    if (windowWidth < 768) {
      handleRemoveZoom()
    }
  }, [windowWidth])

  function chooseActiveImage(imageSrc: string) {
    setActiveImage(imageSrc)
  }

  function prevCurrentImages() {
    if (currentImagesIndex[0] <= 0) return
    setCurrentImagesIndex((prev) => [prev[0] - 1, prev[1] - 1])
  }

  function nextCurrentImages() {
    if (currentImagesIndex[1] >= (product as ProductType).images.length) return
    setCurrentImagesIndex((prev) => [prev[0] + 1, prev[1] + 1])
  }

  function handleZoom(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = ev.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const offsetY = ev.pageY - (rect.y + window.scrollY)
    const offsetX = ev.pageX - (rect.x + window.scrollX)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.height = naturalHeight + 'px'
    image.style.width = naturalWidth + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  function handleRemoveZoom() {
    imageRef.current?.removeAttribute('style')
  }

  function handleBuyCount(value: number) {
    setBuyCount(value)
  }

  function hanldeAddToCart(data: { product_id: string; buy_count: number }) {
    if (!isAuthenticated) {
      const state: StateType = { redirect: pathname }
      navigate(PATH.login, { state })
      toast.warn('Vui lòng đăng nhập trước khi chọn sản phẩm')
      return
    }

    if (purchaseInCartQty >= (product as ProductType).quantity) {
      toast.warn(`Bạn đã có ${purchaseInCartQty} sản phẩm trong giỏ hàng`)
      return
    }

    setIsAddToCart(true)
    addToCartMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.data.message)
        purchasesInCartQuery.refetch()
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        setIsAddToCart(false)
      },
    })
  }

  function handleBuyNow(data: { product_id: string; buy_count: number }) {
    if (!isAuthenticated) {
      const state = { redirect: pathname }
      navigate(PATH.login, { state })
      toast.warn('Vui lòng đăng nhập trước khi chọn sản phẩm')
      return
    }

    if (purchaseInCartQty >= (product as ProductType).quantity) {
      toast.warn(`Bạn đã có ${purchaseInCartQty} sản phẩm trong giỏ hàng`)
      return
    }

    setIsBuyNow(true)
    addToCartMutation.mutate(data, {
      onSuccess: (response) => {
        const state = { purchaseId: response.data.data._id }
        navigate(PATH.cart, { state })
        // purchasesInCartQuery.refetch()
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        setIsBuyNow(false)
      },
    })
  }

  if (isError === true && !product) {
    return <NotFound wrapperClassname="py-56" title="Không tìm thấy sản phẩm" />
  }
  if (!product) return null
  return (
    <div className="bg-secondary py-8">
      <div className="container">
        {/* Product Main */}
        <section className="rounded-sm bg-white p-4 shadow">
          <div className="grid grid-cols-12 md:gap-9">
            {/* Images */}
            <div className="col-span-12 md:col-span-5">
              {/* Active Image */}
              <div
                className="relative overflow-hidden pt-[100%] md:w-full md:cursor-zoom-in"
                onMouseMove={(ev) => {
                  if (windowWidth < 768) return
                  handleZoom(ev)
                }}
                onMouseLeave={() => {
                  if (windowWidth < 768) return
                  handleRemoveZoom()
                }}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                  ref={imageRef}
                />
              </div>
              {/* End Active Image */}
              {/* Images Slide */}
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                {/* Previous */}
                <button
                  className="absolute -left-3.5 top-1/2 z-10 h-8 w-4 -translate-y-1/2 text-gray-400 transition-all duration-1000 md:left-0 md:text-white"
                  onClick={prevCurrentImages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="h-5 w-5 md:h-6 md:w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                {/* End Previous */}
                {currentImages.map((img, index) => {
                  const isActive = img === activeImage
                  return (
                    <div key={index} className="relative col-span-1 w-full cursor-pointer pt-[100%]">
                      <img
                        src={img}
                        alt={product.name}
                        className="absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover"
                        onMouseEnter={() => chooseActiveImage(img)}
                      />
                      {isActive && <div className="absolute inset-0 border-2 border-primary"></div>}
                    </div>
                  )
                })}
                {/* Next */}
                <button
                  className="absolute -right-2.5 top-1/2 z-10 h-8 w-4 -translate-y-1/2 text-gray-400 transition-all duration-1000 md:right-[0.375rem] md:text-white"
                  onClick={nextCurrentImages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="h-5 w-5 md:h-6 md:w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
                {/* End Next */}
              </div>
              {/* End Images Slide */}
            </div>
            {/* End Images */}
            {/* Info */}
            <section className="col-span-12 md:col-span-7">
              <h1 className="mt-3 line-clamp-2 text-xl font-medium text-black/80 md:mt-1">{product.name}</h1>
              {/* Statics */}
              <div className="mt-3 flex items-center md:mt-8">
                {/* Rating */}
                <div className="flex border-r border-r-black/20 pr-4">
                  <span className="mr-1 border-b border-b-primary pb-[0.0625rem] text-primary">
                    {product.rating.toFixed(1)}
                  </span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName="h-4 w-4 fill-primary text-yellow-300"
                    inActiveClassName="h-4 w-4 fill-current text-gray-300"
                  />
                </div>
                {/* End Rating */}
                {/* Sold */}
                <div className="flex items-baseline pl-4">
                  <span className="border-b border-b-[#222] pb-[0.0625rem] text-[#222]">
                    {formatNumberToSocialStyle(product.sold)}
                  </span>
                  <span className="ml-2 text-sm text-[#767676]">Đã Bán</span>
                </div>
                {/* End Sold */}
              </div>
              {/* End Statics */}
              {/* Price */}
              <div className="mt-3 flex items-center bg-[#fafafa] px-5 py-4 md:mt-8">
                <div className="text-sm text-gray-500 line-through md:text-base">
                  ₫{formatCurrency(product.price_before_discount)}
                </div>
                <div className="ml-3 text-base font-medium text-primary md:text-[1.75rem]">
                  ₫{formatCurrency(product.price)}
                </div>
                <div className="ml-3 hidden rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold text-white md:block">
                  {calcDiscountPercentage(product.price_before_discount, product.price)}% GIẢM
                </div>
              </div>
              {/* End Price */}
              {/* Quantity */}
              <div className="mt-4 flex md:mt-8">
                <div className="mt-2 text-gray-500">Số Lượng</div>
                <div className="ml-6">
                  {/* Quantity Controller */}
                  <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={product.quantity - purchaseInCartQty}
                  />
                  {/* End Quantity Controller */}
                  <div className="mt-2 text-xs text-[#757575]">{product.quantity} sản phẩm có sẵn</div>
                </div>
              </div>
              {/* End Quantity */}
              {/* CTA */}
              <div className="mt-8 flex items-center justify-center md:justify-start">
                {/* Add To Cart */}
                <button
                  className={classNames(
                    'flex h-12 items-center justify-center rounded-sm border border-primary bg-primary/10 px-2 text-xs text-primary shadow-sm transition-all hover:bg-primary/5 md:px-5 md:text-base',
                    { 'cursor-not-allowed opacity-50': isAddToCart && addToCartMutation.isLoading }
                  )}
                  onClick={() =>
                    hanldeAddToCart({
                      product_id: product._id,
                      buy_count: buyCount,
                    })
                  }
                  disabled={addToCartMutation.isLoading}
                >
                  {/* Icon */}
                  {isAddToCart && addToCartMutation.isLoading ? (
                    <svg
                      aria-hidden="true"
                      className="mr-2 h-5 w-5 animate-spin fill-slate-400 text-gray-200"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    <svg
                      enableBackground="new 0 0 15 15"
                      viewBox="0 0 15 15"
                      x={0}
                      y={0}
                      className="mr-2 hidden h-5 w-5 fill-primary stroke-primary md:block"
                    >
                      <g>
                        <g>
                          <polyline
                            fill="none"
                            points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                          />
                          <circle cx={6} cy="13.5" r={1} stroke="none" />
                          <circle cx="11.5" cy="13.5" r={1} stroke="none" />
                        </g>
                        <line
                          fill="none"
                          strokeLinecap="round"
                          strokeMiterlimit={10}
                          x1="7.5"
                          x2="10.5"
                          y1={7}
                          y2={7}
                        />
                        <line fill="none" strokeLinecap="round" strokeMiterlimit={10} x1={9} x2={9} y1="8.5" y2="5.5" />
                      </g>
                    </svg>
                  )}
                  {/* End Icon */}
                  Thêm Vào Giỏ Hàng
                </button>
                {/* End Add To Cart */}
                {/* Buy Now */}
                <Button
                  className="ml-4 h-12 min-w-[5rem] rounded-sm px-2 text-xs md:px-5 md:text-base"
                  onClick={() =>
                    handleBuyNow({
                      product_id: product._id,
                      buy_count: buyCount,
                    })
                  }
                  disabled={addToCartMutation.isLoading}
                  isLoading={isBuyNow && addToCartMutation.isLoading}
                >
                  Mua Ngay
                </Button>
                {/* End Buy Now */}
              </div>
              {/* End CTA */}
            </section>
            {/* End Info */}
          </div>
        </section>
        {/* Product Main */}
        {/* Product Description */}
        <section className="mt-4 rounded-sm bg-white p-4 shadow">
          <h2 className="rounded-sm bg-[#fafafa] p-4 text-lg text-black/80">MÔ TẢ SẢN PHẨM</h2>
          <div
            className="mx-4 mb-4 mt-8 text-sm leading-loose"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
          ></div>
        </section>
        {/* End Product Description */}
        {/* Related products */}
        {!productsCategory.isError && (
          <section className="mt-4 text-black/80">
            <h2 className="text-lg">CÓ THỂ BẠN CŨNG THÍCH</h2>
            {productsCategory.isLoading && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-6">
                {Array(Number(queryConfig.limit))
                  .fill(0)
                  .map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
              </div>
            )}
            {productsCategory.isSuccess && productsCategory.data && (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                {productsCategory.data.status === 200 &&
                  productsCategory.data.data.data.products.length !== 0 &&
                  productsCategory.data.data.data.products.map((product) => (
                    <div key={product._id} className="col-span-1">
                      <Product product={product} />
                    </div>
                  ))}
              </div>
            )}
          </section>
        )}
        {/* End Related products */}
      </div>
    </div>
  )
}

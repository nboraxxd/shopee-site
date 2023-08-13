import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'

import productsApi from '@/apis/products.api'
import { calcDiscountPercentage, formatCurrency, formatNumberToSocialStyle, getIdFromSlug } from '@/utils/utils'
import { Product } from '@/types/product.type'
import { useWindowSize } from '@/hooks/useWindowSize'
import { ProductRating } from '@/components/ProductRating'
import { InputNumber } from '@/components/InputNumber'
import { Button } from '@/components/Button'

export default function ProductDetail() {
  const { id: productSlug } = useParams()
  const id = getIdFromSlug(productSlug as string)

  const [currentImagesIndex, setCurrentImagesIndex] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const windowWidth = useWindowSize()

  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productsApi.getProductDetail(id as string),
  })

  const product = productDetailData?.data.data

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentImagesIndex) : []),
    [currentImagesIndex, product]
  )

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
    if (currentImagesIndex[1] >= (product as Product).images.length) return
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
                  className="absolute left-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 text-white transition-all duration-1000"
                  onClick={prevCurrentImages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="h-6 w-6"
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
                  className="absolute right-[0.375rem] top-1/2 z-10 h-8 w-4 -translate-y-1/2 text-white transition-all duration-1000"
                  onClick={nextCurrentImages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="h-6 w-6"
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
                <div className="ml-3 text-base font-medium text-primary md:text-3xl">
                  ₫{formatCurrency(product.price)}
                </div>
                <div className="ml-4 hidden rounded-sm bg-primary px-1 py-[2px] text-sm font-semibold text-white md:block">
                  {calcDiscountPercentage(product.price_before_discount, product.price)}% GIẢM
                </div>
              </div>
              {/* End Price */}
              {/* Quantity */}
              <div className="mt-4 flex md:mt-8">
                <div className="mt-2 text-gray-500">Số Lượng</div>
                <div className="ml-6">
                  {/* Quantity Input */}
                  <div className=" flex items-center">
                    <button className="flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </button>
                    <InputNumber
                      classNameWrapper=" "
                      classNameInput="h-8 w-12 border-l-0 border-r-0 rounded-l-none rounded-r-none text-center"
                      classNameError="hidden"
                    />
                    <button className="flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                  {/* End Quantity Input */}
                  <div className="mt-2 text-xs text-[#757575]">{product.quantity} sản phẩm có sẵn</div>
                </div>
              </div>
              {/* End Quantity */}
              {/* CTA */}
              <div className="mt-8 flex items-center justify-center">
                <button className="flex h-12 items-center justify-center rounded-sm border border-primary bg-primary/10 px-2 text-xs text-primary shadow-sm transition-all hover:bg-primary/5 md:px-5 md:text-base">
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
                      <line fill="none" strokeLinecap="round" strokeMiterlimit={10} x1="7.5" x2="10.5" y1={7} y2={7} />
                      <line fill="none" strokeLinecap="round" strokeMiterlimit={10} x1={9} x2={9} y1="8.5" y2="5.5" />
                    </g>
                  </svg>
                  Thêm Vào Giỏ Hàng
                </button>
                <Button className="ml-4 h-12 min-w-[5rem] rounded-sm px-2 text-xs md:px-5 md:text-base">
                  Mua Ngay
                </Button>
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
      </div>
    </div>
  )
}

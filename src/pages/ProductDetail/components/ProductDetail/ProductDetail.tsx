import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'

import productsApi from '@/apis/products.api'
import { calcDiscountPercentage, formatCurrency, formatNumberToSocialStyle } from '@/utils/utils'
import { ProductRating } from '@/components/ProductRating'
import { InputNumber } from '@/components/InputNumber'
import { Button } from '@/components/Button'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productsApi.getProductDetail(id as string),
  })

  const product = productDetailData?.data.data
  console.log('🔥 ~ ProductDetail ~ product:', product)

  if (!product) return null
  return (
    <div className="bg-secondary py-8">
      <div className="container">
        {/* Product Main */}
        <section className="rounded-sm bg-white p-4 shadow">
          <div className="grid grid-cols-12 gap-9">
            {/* Images */}
            <div className="col-span-5">
              {/* Main Image */}
              <div className="relative w-full pt-[100%]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                />
              </div>
              {/* End Main Image */}
              {/* Images Slide */}
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button className="absolute left-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 text-white">
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
                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0
                  return (
                    <div key={index} className="relative w-full pt-[100%]">
                      <img
                        src={img}
                        alt=""
                        className="absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover"
                      />
                      {isActive && <div className="absolute inset-0 border-2 border-primary"></div>}
                    </div>
                  )
                })}
                <button className="absolute right-[0.375rem] top-1/2 z-10 h-8 w-4 -translate-y-1/2 text-white">
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
              </div>
              {/* End Images Slide */}
            </div>
            {/* End Images */}
            {/* Info */}
            <section className="col-span-7">
              <h1 className="line-clamp-2 pt-1 text-xl font-medium text-black/80">{product.name}</h1>
              {/* Statics */}
              <div className="mt-8 flex items-center">
                {/* Rating */}
                <div className="flex border-r border-r-black/20 pr-4">
                  <span className="mr-1 border-b border-b-primary pb-[0.0625rem] text-primary">
                    {product.rating.toFixed(1)}
                  </span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName="h-4 w-4 fill-primary text-yellow-300"
                    inActiveClassName="h-4 w-4 fill-current text-gray-300 "
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
              <div className="mt-8 flex items-center bg-[#fafafa] px-5 py-4">
                <div className="text-gray-500 line-through">₫{formatCurrency(product.price_before_discount)}</div>
                <div className="ml-3 text-3xl font-medium text-primary">₫{formatCurrency(product.price)}</div>
                <div className="ml-4 rounded-sm bg-primary px-1 py-[2px] text-sm font-semibold text-white">
                  {calcDiscountPercentage(product.price_before_discount, product.price)}% GIẢM
                </div>
              </div>
              {/* End Price */}
              {/* Quantity */}
              <div className="mt-8 flex items-center">
                <div className="text-gray-500">Số Lượng</div>
                {/* Quantity Input */}
                <div className="ml-10 flex items-center">
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
                <div className="ml-4 text-[#757575]">{product.quantity} sản phẩm có sẵn</div>
              </div>
              {/* End Quantity */}
              {/* CTA */}
              <div className="mt-8 flex items-center">
                <button className="flex h-12 items-center justify-center rounded-sm border border-primary bg-primary/10 px-5 text-primary shadow-sm transition-all hover:bg-primary/5">
                  <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x={0}
                    y={0}
                    className="mr-2 h-5 w-5 fill-primary stroke-primary"
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
                <Button className="ml-4 h-12 min-w-[5rem] rounded-sm px-5">Mua Ngay</Button>
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

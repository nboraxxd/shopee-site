import { Link, generatePath } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { Product } from '@/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '@/utils/utils'
import { ProductRating } from '@/components/ProductRating'

export default function Product({ product }: { product: Product }) {
  const courseDetailPath = generatePath(PATH.productDetail, { id: product._id })

  return (
    <Link to={courseDetailPath}>
      {/* Container */}
      <div className="overflow-hidden rounded-sm bg-white shadow transition-all duration-200 hover:-mt-[1px] hover:shadow-xl">
        {/* Product Image */}
        <div className="relative w-full pt-[100%]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute left-0 top-0 h-full w-full bg-white object-cover"
          />
        </div>
        {/* End Product Image */}
        {/* Product Info */}
        <div className="p-2">
          {/* Product Name */}
          <div className="line-clamp-2 min-h-[2rem] text-xs">{product.name}</div>
          {/* End Product Name */}
          {/* Product Price */}
          <div className="mt-2 flex items-center gap-[2px] md:mt-3">
            <div className="line-clamp-1 hidden max-w-[50%] text-sm text-gray-400 line-through sm:block">
              <span>₫</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className="ml-1 line-clamp-1 text-sm text-primary">
              <span>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          {/* End Product Price */}
          {/* Product Statics */}
          <div className="mt-2 flex items-baseline md:mt-3">
            {/* Rating */}
            <div className="hidden items-center sm:flex">
              <ProductRating rating={product.rating} />
            </div>
            {/* End Rating */}
            {/* Sold */}
            <div className="flex items-center gap-[2px] text-xs sm:ml-2 sm:text-sm">
              <span>Đã bán</span>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
            {/* End Sold */}
          </div>
          {/* End Product Statics */}
        </div>
        {/* End Product Info */}
      </div>
      {/* End Container */}
    </Link>
  )
}

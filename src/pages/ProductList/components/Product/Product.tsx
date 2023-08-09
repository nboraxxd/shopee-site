import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { Product } from '@/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '@/utils/utils'

export default function Product({ product }: { product: Product }) {
  console.log(product)
  return (
    <Link to={PATH.home}>
      {/* Container */}
      <div className="overflow-hidden rounded-sm bg-white shadow transition-all duration-200 hover:shadow-lg">
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
          <div className="mt-3 flex items-center gap-[2px]">
            <div className="line-clamp-1 max-w-[50%] text-sm text-gray-400 line-through">
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
          <div className="mt-3 flex items-baseline">
            {/* Rating */}
            <div className="flex items-center">
              {Array(Math.floor(product.rating))
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: '100%' }}>
                      <svg
                        enableBackground="new 0 0 15 15"
                        viewBox="0 0 15 15"
                        x={0}
                        y={0}
                        className="h-3 w-3 fill-yellow-300 text-yellow-300"
                      >
                        <polygon
                          points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                        />
                      </svg>
                    </div>
                    <svg
                      enableBackground="new 0 0 15 15"
                      viewBox="0 0 15 15"
                      x={0}
                      y={0}
                      className="h-3 w-3 fill-current text-gray-300"
                    >
                      <polygon
                        points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                      />
                    </svg>
                  </div>
                ))}
              {Array(1)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="relative">
                    <div
                      className="absolute left-0 top-0 h-full overflow-hidden"
                      style={{ width: `${(product.rating - Math.floor(product.rating)) * 100}%` }}
                    >
                      <svg
                        enableBackground="new 0 0 15 15"
                        viewBox="0 0 15 15"
                        x={0}
                        y={0}
                        className="h-3 w-3 fill-yellow-300 text-yellow-300"
                      >
                        <polygon
                          points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                        />
                      </svg>
                    </div>
                    <svg
                      enableBackground="new 0 0 15 15"
                      viewBox="0 0 15 15"
                      x={0}
                      y={0}
                      className="h-3 w-3 fill-current text-gray-300"
                    >
                      <polygon
                        points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                      />
                    </svg>
                  </div>
                ))}
              {Array(5 - Math.ceil(product.rating))
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: '0%' }}>
                      <svg
                        enableBackground="new 0 0 15 15"
                        viewBox="0 0 15 15"
                        x={0}
                        y={0}
                        className="h-3 w-3 fill-yellow-300 text-yellow-300"
                      >
                        <polygon
                          points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                        />
                      </svg>
                    </div>
                    <svg
                      enableBackground="new 0 0 15 15"
                      viewBox="0 0 15 15"
                      x={0}
                      y={0}
                      className="h-3 w-3 fill-current text-gray-300"
                    >
                      <polygon
                        points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                      />
                    </svg>
                  </div>
                ))}
            </div>
            {/* End Rating */}
            {/* Sold */}
            <div className="ml-2 flex items-center gap-[2px] text-sm">
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

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useScrollTop } from '@/hooks/useScrollTop'
import { AsideFilter, Product, SortProductList } from '@/pages/ProductList'
import { productsApi } from '@/apis/product.api'
import useQueryParams from '@/hooks/useQueryParams'

export default function ProductList() {
  useScrollTop()

  const [isShowAside, setIsShowAside] = useState(false)
  const queryParams = useQueryParams()

  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productsApi.getProducts(queryParams),
  })

  return (
    <div className="bg-secondary">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 py-7">
          <AsideFilter isShowAside={isShowAside} setIsShowAside={setIsShowAside} />
          <div className="col-span-12 lg:col-span-9">
            <SortProductList setIsShowAside={setIsShowAside} />
            <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-4 xl:grid-cols-5">
              {data &&
                data.status === 200 &&
                data.data.data.products.map((product) => (
                  <div key={product._id} className="col-span-1">
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

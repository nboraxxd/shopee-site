import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import useQueryParams from '@/hooks/useQueryParams'
import { productsApi } from '@/apis/product.api'
import { AsideFilter, Product, SortProductList } from '@/pages/ProductList'
import { Pagination } from '@/components/Pagination'

export default function ProductList() {
  const queryParams = useQueryParams()
  const [isShowAside, setIsShowAside] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productsApi.getProducts(queryParams),
  })

  useEffect(() => {
    const body = document.body
    isShowAside ? body.classList.add('overflow-hidden') : body.classList.remove('overflow-hidden')

    return () => {
      body.classList.remove('overflow-hidden')
    }
  }, [isShowAside])

  return (
    <div className="bg-secondary">
      <div className="container">
        {/* Wrapper */}
        <div className="grid grid-cols-12 gap-6 py-7">
          {/* AsideFilter */}
          <div
            className={classNames('fixed z-10 lg:relative lg:col-span-3 lg:bg-transparent', {
              'left-0 top-0 h-full w-full bg-black/50': isShowAside,
            })}
          >
            <AsideFilter isShowAside={isShowAside} setIsShowAside={setIsShowAside} />
          </div>
          {/* End AsideFilter */}
          {/* Product List */}
          <div className="col-span-12 lg:col-span-9">
            <SortProductList setIsShowAside={setIsShowAside} />
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {data &&
                data.status === 200 &&
                data.data.data.products.map((product) => (
                  <div key={product._id} className="col-span-1">
                    <Product product={product} />
                  </div>
                ))}
            </div>
            {/* Pagination */}
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={20} />
            {/* End Pagination */}
          </div>
          {/* End Product List */}
        </div>
        {/* End Wrapper */}
      </div>
    </div>
  )
}

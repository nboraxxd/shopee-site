import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import useQueryParams from '@/hooks/useQueryParams'
import { productsApi } from '@/apis/product.api'
import { ProductListConfig } from '@/types/product.type'
import { AsideFilter, Product, SortProductList } from '@/pages/ProductList'
import { Pagination } from '@/components/Pagination'
import { ProductSkeleton } from '../ProductSkeleton'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '12',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
    },
    isUndefined
  )

  const [isShowAside, setIsShowAside] = useState(false)

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productsApi.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true,
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
          {/* Product Main */}

          <div className="col-span-12 lg:col-span-9">
            <SortProductList
              setIsShowAside={setIsShowAside}
              queryConfig={queryConfig}
              pageSize={data?.data.data.pagination.page_size}
            />

            {/* Product List */}
            {isLoading && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {Array(Number(queryConfig.limit))
                  .fill(0)
                  .map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
              </div>
            )}
            {isSuccess && data && (
              <>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                  {data.status === 200 &&
                    data.data.data.products.map((product) => (
                      <div key={product._id} className="col-span-1">
                        <Product product={product} />
                      </div>
                    ))}
                </div>
                {/* End Product List */}
                {/* Pagination */}
                <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
                {/* End Pagination */}
              </>
            )}
          </div>

          {/* End Product Main */}
        </div>
        {/* End Wrapper */}
      </div>
    </div>
  )
}

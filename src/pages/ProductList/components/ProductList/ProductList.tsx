import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import useQueryParams from '@/hooks/useQueryParams'
import productsApi from '@/apis/products.api'
import categoriesApi from '@/apis/categories.api'
import PARAMETER_KEY from '@/constants/parameter'
import { ProductListConfig } from '@/types/product.type'
import { AsideFilter, Product, SortProductList } from '@/pages/ProductList'
import { Pagination } from '@/components/Pagination'
import { ProductSkeleton } from '../ProductSkeleton'
import { Button } from '@/components/Button'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      [PARAMETER_KEY.page]: queryParams.page || '1',
      [PARAMETER_KEY.limit]: queryParams.limit || '12',
      [PARAMETER_KEY.sort_by]: queryParams.sort_by,
      [PARAMETER_KEY.exclude]: queryParams.exclude,
      [PARAMETER_KEY.name]: queryParams.name,
      [PARAMETER_KEY.order]: queryParams.order,
      [PARAMETER_KEY.price_max]: queryParams.price_max,
      [PARAMETER_KEY.price_min]: queryParams.price_min,
      [PARAMETER_KEY.rating_filter]: queryParams.rating_filter,
      [PARAMETER_KEY.category]: queryParams.category,
    },
    isUndefined
  )

  const [isShowAside, setIsShowAside] = useState(false)

  const productsQuery = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productsApi.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true,
  })

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories(),
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
            <AsideFilter
              isShowAside={isShowAside}
              setIsShowAside={setIsShowAside}
              categories={categoriesQuery.data?.data.data || []}
              queryConfig={queryConfig}
            />
          </div>
          {/* End AsideFilter */}
          {/* Product Main */}
          <div className="col-span-12 lg:col-span-9">
            <SortProductList
              setIsShowAside={setIsShowAside}
              queryConfig={queryConfig}
              pageSize={productsQuery.data?.data.data.pagination.page_size}
              isLoading={productsQuery.isLoading}
              isSuccess={productsQuery.isSuccess}
            />
            {/* Product List */}
            {productsQuery.isLoading && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {Array(Number(queryConfig.limit))
                  .fill(0)
                  .map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
              </div>
            )}
            {productsQuery.isSuccess && productsQuery.data && (
              <>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                  {productsQuery.data.status === 200 && productsQuery.data.data.data.products.length !== 0 ? (
                    productsQuery.data.data.data.products.map((product) => (
                      <div key={product._id} className="col-span-1">
                        <Product product={product} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center sm:col-span-3 md:col-span-4 xl:col-span-5">
                      <img
                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/categorypage/a60759ad1dabe909c46a817ecbf71878.png"
                        alt="empty products"
                        className="w-28"
                      />
                      <div className="mt-3 text-center text-gray-500 md:text-xl">
                        <p>Hix. Không có sản phẩm nào.</p>
                        <p className="mt-3">Bạn thử tắt điều kiện lọc và tìm lại nhé?</p>
                      </div>
                      <Button className="mt-6 w-fit px-2 py-3">Xoá bộ lọc</Button>
                    </div>
                  )}
                </div>
                {/* End Product List */}
                {/* Pagination */}
                {productsQuery.data.status === 200 && productsQuery.data.data.data.products.length !== 0 && (
                  <Pagination queryConfig={queryConfig} pageSize={productsQuery.data.data.data.pagination.page_size} />
                )}
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

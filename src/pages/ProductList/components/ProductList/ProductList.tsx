import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createSearchParams, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import omit from 'lodash/omit'

import productsApi from '@/apis/products.api'
import categoriesApi from '@/apis/categories.api'
import PARAMETER_KEY from '@/constants/parameter'
import { ProductListConfig } from '@/types/product.type'
import { PATH } from '@/constants/path'
import useQueryConfig from '@/hooks/useQueryConfig'
import { AsideFilter, Product, SortProductList, ProductSkeleton } from '@/pages/ProductList'
import { Pagination } from '@/components/Pagination'
import { Button } from '@/components/Button'
import noProduct from '@/assets/images/no-products.png'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const [isShowAside, setIsShowAside] = useState(false)

  const navigate = useNavigate()

  const productsQuery = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productsApi.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  })

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories(),
  })

  function handleClearFilter() {
    const searchParamsToString = createSearchParams(
      omit(
        {
          ...queryConfig,
          [PARAMETER_KEY.page]: '1',
        },
        [PARAMETER_KEY.category, PARAMETER_KEY.price_min, PARAMETER_KEY.price_max, PARAMETER_KEY.rating_filter]
      )
    ).toString()

    navigate({
      pathname: PATH.products,
      search: searchParamsToString,
    })
  }

  useEffect(() => {
    const body = document.body
    isShowAside ? (body.style.cssText = 'overflow: hidden') : body.removeAttribute('style')

    return () => {
      body.removeAttribute('style')
    }
  }, [isShowAside])

  return (
    <div className="overflow-hidden bg-secondary">
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
              handleClearFilter={handleClearFilter}
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
                      <img src={noProduct} alt="empty products" className="w-28" />
                      <div className="mt-3 text-center text-gray-500 md:text-xl">
                        <p>Hix. Không có sản phẩm nào.</p>
                        <p className="mt-3">Bạn thử xoá điều kiện lọc và tìm lại nhé?</p>
                      </div>
                      <Button className="mt-6 max-w-[12rem] rounded-sm p-3" onClick={handleClearFilter}>
                        Xoá bộ lọc
                      </Button>
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

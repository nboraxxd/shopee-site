import { SetStateAction } from 'react'
import { Tooltip } from 'react-tooltip'
import classNames from 'classnames'
import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'

import PARAMETER_KEY from '@/constants/parameter'
import { sortBy, order as orderConstants } from '@/constants/product'
import { PATH } from '@/constants/path'
import { OrderT, SortT } from '@/types/product.type'
import { QueryConfig } from '@/types/query.type'
import { SortButton } from '@/pages/ProductList'

interface Props {
  setIsShowAside: React.Dispatch<SetStateAction<boolean>>
  queryConfig: QueryConfig
  pageSize?: number
  isLoading: boolean
  isSuccess: boolean
}

export default function SortProductList({ setIsShowAside, queryConfig, pageSize, isLoading, isSuccess }: Props) {
  const { sort_by = sortBy.createdAt, order, category, price_min, price_max, rating_filter } = queryConfig
  const currentPage = Number(queryConfig.page)
  const navigate = useNavigate()

  function isActiveSortBy(sortByValue: SortT) {
    return sort_by === sortByValue
  }

  function searchParamsToString(parameters: { sort_by: SortT; order?: OrderT }, filterOmit: string[] = []) {
    return createSearchParams(
      omit(
        {
          ...queryConfig,
          ...parameters,
          [PARAMETER_KEY.page]: '1',
        },
        filterOmit
      )
    ).toString()
  }

  function handleSort(sortByValue: SortT) {
    navigate({
      pathname: PATH.products,
      search: searchParamsToString({ [PARAMETER_KEY.sort_by]: sortByValue }, [PARAMETER_KEY.order]),
    })
  }

  function handlePriceOrder(orderValue: OrderT) {
    navigate({
      pathname: PATH.products,
      search: searchParamsToString({ [PARAMETER_KEY.sort_by]: sortBy.price, [PARAMETER_KEY.order]: orderValue }),
    })
  }

  function handleChangePage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > (pageSize as number)) return

    const searchParamsToString = createSearchParams({
      ...queryConfig,
      [PARAMETER_KEY.page]: pageNumber.toString(),
    }).toString()

    navigate({
      pathname: PATH.products,
      search: searchParamsToString,
    })
  }

  return (
    <div className="bg-gray-300/40 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center md:gap-2">
          {/* Show Filter */}
          <div className="mr-1 block border-r border-gray-400 pr-2 lg:hidden">
            <button
              className="flex items-center p-1"
              data-tooltip-id="filter-btn"
              data-tooltip-content="Nhấn để hiển thị bộ lọc"
              onClick={() => setIsShowAside(true)}
            >
              {/* category, price_min, price_max, rating_filter */}
              <div
                className={classNames('transition-all', {
                  "relative before:absolute before:right-0 before:top-0 before:h-2.5 before:w-2.5 before:rounded-full before:bg-gray-500 before:content-['']":
                    category || price_min || price_max || rating_filter,
                })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
              </div>
              <span className="ml-1 hidden text-sm sm:inline">Lọc</span>
            </button>
          </div>
          <Tooltip id="filter-btn" place="bottom" style={{ fontSize: '12px', padding: '8px', zIndex: '1' }} />
          {/* End Show Filter */}
          {/* Sort */}
          <p className="mr-1 hidden text-sm lg:block">Sắp xếp theo</p>
          <SortButton sortValue={sortBy.createdAt} isActive={isActiveSortBy} handleSort={handleSort}>
            Mới nhất
          </SortButton>
          <SortButton sortValue={sortBy.view} isActive={isActiveSortBy} handleSort={handleSort}>
            Phổ biến
          </SortButton>
          <SortButton sortValue={sortBy.sold} isActive={isActiveSortBy} handleSort={handleSort} endButton={true}>
            Bán chạy
          </SortButton>
          <select
            className={classNames(
              'hidden h-8 bg-white pl-2 pr-4 text-xs text-gray-700 outline-none transition-all hover:bg-gray-100 sm:block md:text-sm',
              {
                'text-primary': isActiveSortBy(sortBy.price),
              }
            )}
            value={order || ''}
            onChange={(ev) => handlePriceOrder(ev.target.value as OrderT)}
          >
            <option value="" disabled>
              Giá
            </option>
            <option value={orderConstants.asc} className="text-gray-700">
              Thấp đến cao
            </option>
            <option value={orderConstants.desc} className="text-gray-700">
              Cao đến thấp
            </option>
          </select>
        </div>
        {/* End Sort */}
        {/* Pagination */}
        <div className="ml-2 hidden items-center sm:flex">
          {isLoading === false ? (
            <>
              {isSuccess && (
                <div className="mr-2 text-xs md:mr-4 md:text-sm">
                  <span className="text-primary">{currentPage}</span>
                  <span>/{pageSize}</span>
                </div>
              )}

              {/* Previous */}
              <button
                className="h-8 rounded-bl-sm rounded-tl-sm bg-white px-3 shadow-sm transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                disabled={currentPage === 1 || isSuccess === false}
                onClick={() => handleChangePage(currentPage - 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              {/* End Previous */}
              {/* Next */}
              <button
                className="h-8 rounded-br-sm rounded-tr-sm bg-white px-3 shadow-sm transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                disabled={currentPage === pageSize || isSuccess === false}
                onClick={() => handleChangePage(currentPage + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              {/* End Next */}
            </>
          ) : (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-8 w-28 rounded bg-gray-100"></div>
            </div>
          )}
        </div>
        {/* End Pagination */}
      </div>
    </div>
  )
}

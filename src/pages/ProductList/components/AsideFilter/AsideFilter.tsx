import { SetStateAction, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import omit from 'lodash/omit'

import { PATH } from '@/constants/path'
import PARAMETER_KEY from '@/constants/parameter'
import { Category } from '@/types/category.type'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { QueryConfig } from '../ProductList/ProductList'

interface Props {
  isShowAside: boolean
  setIsShowAside: React.Dispatch<SetStateAction<boolean>>
  categories: Category[]
  queryConfig: QueryConfig
}

export default function AsideFilter({ isShowAside, setIsShowAside, categories, queryConfig }: Props) {
  const filterRef = useRef<HTMLElement>(null)
  const { category: categoryQuery } = queryConfig

  function searchParamsToString(categoryId: string) {
    return createSearchParams({
      ...queryConfig,
      [PARAMETER_KEY.category]: categoryId,
      [PARAMETER_KEY.page]: '1',
    }).toString()
  }

  useEffect(() => {
    const handler = (ev: MouseEvent) => {
      if (ev.target instanceof HTMLElement && !filterRef.current?.contains(ev.target)) {
        setIsShowAside(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [setIsShowAside])

  return (
    <aside
      ref={filterRef}
      className={classNames(
        'fixed left-0 top-0 z-10 h-full w-64 -translate-x-64 bg-white shadow-xl transition-transform duration-500 lg:relative lg:w-full lg:transform-none lg:bg-transparent lg:shadow-none',
        {
          'transform-none overflow-y-auto scrollbar-hide': isShowAside,
        }
      )}
    >
      {/* Sidebar Title */}
      <div className="flex items-center justify-between bg-primary p-4 text-white lg:hidden">
        <p className="mx-auto cursor-default">Lọc sản phẩm</p>
        <button className="p-1" onClick={() => setIsShowAside(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* End Sidebar Title */}
      {/* Sidebar Main */}
      <div className="px-6 py-4 lg:py-0 lg:pl-0 lg:pr-3">
        {/* Category */}
        <div>
          <div className="flex items-center font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p>Danh Mục</p>
          </div>
          <ul>
            <li className="mt-1 py-1 pl-4">
              <Link
                to={{
                  pathname: PATH.products,
                  search: createSearchParams(
                    omit(
                      {
                        ...queryConfig,
                        [PARAMETER_KEY.page]: '1',
                      },
                      [PARAMETER_KEY.category]
                    )
                  ).toString(),
                }}
                className={classNames('relative inline-block py-2 font-semibold', {
                  'text-primary': categoryQuery === undefined,
                })}
                onClick={() => setIsShowAside(false)}
              >
                {categoryQuery === undefined && (
                  <svg viewBox="0 0 2 7" className="absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 fill-primary">
                    <polygon points="4 3.5 0 0 0 7"></polygon>
                  </svg>
                )}
                Tất cả
              </Link>
            </li>

            {categories.length !== 0 ? (
              categories.map((category) => (
                <li key={category._id} className="py-1 pl-4">
                  <Link
                    to={{ pathname: PATH.products, search: searchParamsToString(category._id) }}
                    className={classNames('relative inline-block py-2', {
                      'text-primary': categoryQuery === category._id,
                    })}
                    onClick={() => setIsShowAside(false)}
                  >
                    {categoryQuery === category._id && (
                      <svg viewBox="0 0 2 7" className="absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 fill-primary">
                        <polygon points="4 3.5 0 0 0 7"></polygon>
                      </svg>
                    )}
                    {category.name}
                  </Link>
                </li>
              ))
            ) : (
              <div role="status" className="mt-2 max-w-sm animate-pulse">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="mt-1 h-8 w-full rounded bg-white"></div>
                  ))}
              </div>
            )}
          </ul>
        </div>
        {/* End Category */}
        <div className="my-4 h-[1px] bg-gray-200"></div>
        {/* Filter */}
        <div>
          {/* Title */}
          <div className="mt-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
            <p className="font-semibold">Bộ lọc</p>
            <button className="ml-auto px-1.5 py-1.5 text-sm font-semibold text-primary">Xoá lọc</button>
          </div>
          {/* End Title */}
          {/* Price Filter */}
          <div className="mt-4">
            <p className="text-sm">Khoảng giá</p>
            <form className="mt-2">
              <div className="flex items-center">
                <Input
                  classNameWrapper="grow"
                  classNameInput="p-[4.5px_2px_4.5px_5px] placeholder:text-xs"
                  classNameError="min-h-0"
                  placeholder="₫ TỪ"
                  name="from"
                />
                <div className="mx-3 h-[1px] w-3 shrink-0 bg-[#bdbdbd]" />
                <Input
                  classNameWrapper="grow"
                  classNameInput="p-[4.5px_2px_4.5px_5px] placeholder:text-xs"
                  classNameError="min-h-0"
                  placeholder="₫ ĐẾN"
                  name="to"
                />
              </div>
              <Button className="mt-4 px-1.5 py-1.5 text-sm">Áp dụng</Button>
            </form>
          </div>
          {/* End Price Filter */}
          {/* Rating Filter */}
          <div className="mt-4">
            <p className="text-sm">Đánh giá</p>
            <ul className="mt-2">
              <li>
                <button className="flex items-center gap-1 py-1">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <svg viewBox="0 0 9.5 8" className="h-[14px] w-[14px]" key={index}>
                        <defs>
                          <linearGradient id="ratingStarGradient" x1="50%" x2="50%" y1="0%" y2="100%">
                            <stop offset={0} stopColor="#ffca11" />
                            <stop offset={1} stopColor="#ffad27" />
                          </linearGradient>
                          <polygon
                            id="ratingStar"
                            points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                          />
                        </defs>
                        <g fill="url(#ratingStarGradient)" fillRule="evenodd" stroke="none" strokeWidth={1}>
                          <g transform="translate(-876 -1270)">
                            <g transform="translate(155 992)">
                              <g transform="translate(600 29)">
                                <g transform="translate(10 239)">
                                  <g transform="translate(101 10)">
                                    <use stroke="#ffa727" strokeWidth=".5" xlinkHref="#ratingStar" />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    ))}
                </button>
              </li>
              <li className="mt-1">
                <button className="flex items-center gap-1 py-1">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <svg viewBox="0 0 9.5 8" className="h-[14px] w-[14px]" key={index}>
                        <defs>
                          <linearGradient id="ratingStarGradient" x1="50%" x2="50%" y1="0%" y2="100%">
                            <stop offset={0} stopColor="#ffca11" />
                            <stop offset={1} stopColor="#ffad27" />
                          </linearGradient>
                          <polygon
                            id="ratingStar"
                            points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                          />
                        </defs>
                        <g fill="url(#ratingStarGradient)" fillRule="evenodd" stroke="none" strokeWidth={1}>
                          <g transform="translate(-876 -1270)">
                            <g transform="translate(155 992)">
                              <g transform="translate(600 29)">
                                <g transform="translate(10 239)">
                                  <g transform="translate(101 10)">
                                    <use stroke="#ffa727" strokeWidth=".5" xlinkHref="#ratingStar" />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    ))}
                  <span className="text-sm text-gray-700">trở lên</span>
                </button>
              </li>
            </ul>
          </div>
          {/* End Rating Filter */}
        </div>
        {/* End Filter */}
      </div>
      {/* End Sidebar Main */}
    </aside>
  )
}

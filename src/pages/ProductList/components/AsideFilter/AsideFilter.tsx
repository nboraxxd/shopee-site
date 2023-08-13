import { SetStateAction, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { PATH } from '@/constants/path'
import PARAMETER_KEY from '@/constants/parameter'
import { schema } from '@/utils/rules'
import { QueryConfig } from '@/types/query.type'
import { Category } from '@/types/category.type'
import { RatingStars } from '@/pages/ProductList'
import { Button } from '@/components/Button'
import { InputNumber } from '@/components/InputNumber'

interface Props {
  isShowAside: boolean
  setIsShowAside: React.Dispatch<SetStateAction<boolean>>
  categories: Category[]
  queryConfig: QueryConfig
  handleClearFilter: () => void
}

type PriceSchema = {
  price_min: string | undefined
  price_max: string | undefined
}

// tạo ra 1 schema mới chỉ lấy price_min và price_max
// type PriceSchema = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

type ParametersT = Partial<{
  [key in keyof typeof PARAMETER_KEY]: string
}>

export default function AsideFilter(props: Props) {
  const { isShowAside, setIsShowAside, categories, queryConfig, handleClearFilter } = props
  const filterRef = useRef<HTMLElement>(null)

  const { category: categoryQuery } = queryConfig
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<PriceSchema>({
    defaultValues: {
      price_min: '',
      price_max: '',
    },
    resolver: yupResolver(priceSchema),
  })

  function searchParamsToString(parameters: ParametersT) {
    return createSearchParams({
      ...queryConfig,
      ...parameters,
      [PARAMETER_KEY.page]: '1',
    }).toString()
  }

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: PATH.products,
      search: searchParamsToString({
        [PARAMETER_KEY.price_min]: data.price_min,
        [PARAMETER_KEY.price_max]: data.price_max,
      }),
    })
    setIsShowAside(false)
  })

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
      <div className="mb-5 px-6 py-4 lg:py-0 lg:pl-0 lg:pr-3">
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
            <p>Danh mục</p>
          </div>
          <ul>
            {categories.length !== 0 ? (
              <>
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
                {categories.map((category) => (
                  <li key={category._id} className="py-1 pl-4">
                    <Link
                      to={{
                        pathname: PATH.products,
                        search: searchParamsToString({ [PARAMETER_KEY.category]: category._id }),
                      }}
                      className={classNames('relative inline-block py-2', {
                        'text-primary': categoryQuery === category._id,
                      })}
                      onClick={() => setIsShowAside(false)}
                    >
                      {categoryQuery === category._id && (
                        <svg
                          viewBox="0 0 2 7"
                          className="absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 fill-primary"
                        >
                          <polygon points="4 3.5 0 0 0 7"></polygon>
                        </svg>
                      )}
                      {category.name}
                    </Link>
                  </li>
                ))}
              </>
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
            <button
              className="ml-auto px-1.5 py-1.5 text-sm font-semibold text-primary"
              onClick={() => {
                handleClearFilter()
                setIsShowAside(false)
                errors.price_min = undefined
              }}
            >
              Xoá lọc
            </button>
          </div>
          {/* End Title */}
          {/* Price Filter */}
          <div className="mt-4">
            <p className="text-sm">Khoảng giá</p>
            <form className="mt-2" onSubmit={onSubmit}>
              <div className="flex items-center">
                <Controller
                  control={control}
                  name="price_min"
                  render={({ field }) => {
                    return (
                      <InputNumber
                        classNameWrapper="grow"
                        classNameInput="w-full p-[4.5px_2px_4.5px_5px] placeholder:text-xs"
                        classNameError="min-h-0"
                        placeholder="₫ TỪ"
                        onChange={(event) => {
                          field.onChange(event)
                          trigger('price_max')
                        }}
                        value={field.value}
                        ref={field.ref}
                      />
                    )
                  }}
                />

                <div className="mx-3 h-[1px] w-3 shrink-0 bg-[#bdbdbd]" />
                <Controller
                  control={control}
                  name="price_max"
                  render={({ field }) => {
                    return (
                      <InputNumber
                        classNameWrapper="grow"
                        classNameInput="w-full p-[4.5px_2px_4.5px_5px] placeholder:text-xs"
                        classNameError="min-h-0"
                        placeholder="₫ ĐẾN"
                        onChange={(ev) => {
                          field.onChange(ev)
                          trigger('price_min')
                        }}
                        value={field.value}
                        ref={field.ref}
                      />
                    )
                  }}
                />
              </div>
              <p className={`mb-1 min-h-[1rem] text-xs text-red-600`}>{errors.price_min?.message}</p>
              <Button className="w-full rounded-sm px-1.5 py-1.5 text-sm">Áp dụng</Button>
            </form>
          </div>
          {/* End Price Filter */}
          {/* Rating Filter */}
          <div className="mt-4">
            <p className="text-sm">Đánh giá</p>
            <RatingStars queryConfig={queryConfig} setIsShowAside={setIsShowAside} />
          </div>
          {/* End Rating Filter */}
        </div>
        {/* End Filter */}
      </div>
      {/* End Sidebar Main */}
    </aside>
  )
}

import { useNavigate, createSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { PATH } from '@/constants/path'
import { QueryConfig } from '@/types/query.type'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 1
export default function Pagination({ queryConfig, pageSize }: Props) {
  const currentPage = Number(queryConfig.page)
  const navigate = useNavigate()

  function renderPagination() {
    let dotBefore = false
    let dotAfter = false

    function renderDotBefore(index: number) {
      if (dotBefore === false) {
        dotBefore = true
        return (
          <span key={index} className="mx-1 rounded bg-white px-3 py-2 shadow-sm">
            ...
          </span>
        )
      }
      return null
    }

    function renderDotAfter(index: number) {
      if (dotAfter === false) {
        dotAfter = true
        return (
          <span key={index} className="mx-1 rounded bg-white px-3 py-2 shadow-sm">
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index)
        }

        if (pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        }

        return (
          <button
            key={index}
            className={classNames('mx-1 rounded px-3 py-2 shadow-sm transition-all', {
              'bg-primary text-white': pageNumber === currentPage,
              'bg-white': pageNumber !== currentPage,
            })}
            onClick={() => handleChangePage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }

  function handleChangePage(pageNumber: number) {
    const searchParamsToString = createSearchParams({
      ...queryConfig,
      page: pageNumber.toString(),
    }).toString()

    navigate({
      pathname: PATH.products,
      search: searchParamsToString,
    })
  }

  return (
    <div className="mt-6 flex flex-wrap justify-center">
      <button
        className={classNames('mx-2 min-w-[60px] rounded bg-white px-3 py-2 shadow-sm', {
          'cursor-not-allowed opacity-50': currentPage === 1,
        })}
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
      >
        Prev
      </button>
      <div className="hidden sm:block">{renderPagination()}</div>
      <button
        className={classNames('mx-2 min-w-[60px] rounded bg-white px-3 py-2 shadow-sm', {
          'cursor-not-allowed opacity-50': currentPage === pageSize,
        })}
        disabled={currentPage === pageSize}
        onClick={() => handleChangePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  pageSize: number
}

const RANGE = 1
export default function Pagination({ currentPage, setCurrentPage, pageSize }: Props) {
  function renderPagination() {
    let dotBefore = false
    let dotAfter = false

    function renderDotBefore(index: number) {
      if (dotBefore === false) {
        dotBefore = true
        return (
          <button key={index} className="mx-1 rounded bg-white px-3 py-2 shadow-sm">
            ...
          </button>
        )
      }
      return null
    }

    function renderDotAfter(index: number) {
      if (dotAfter === false) {
        dotAfter = true
        return (
          <button key={index} className="mx-1 rounded bg-white px-3 py-2 shadow-sm">
            ...
          </button>
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
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className="mt-6 flex flex-wrap justify-center">
      <button className="mx-2 min-w-[60px] rounded bg-white px-3 py-2 shadow-sm">Prev</button>
      <div className="hidden sm:block">{renderPagination()}</div>
      <button className="mx-2 min-w-[60px] rounded bg-white px-3 py-2 shadow-sm">Next</button>
    </div>
  )
}

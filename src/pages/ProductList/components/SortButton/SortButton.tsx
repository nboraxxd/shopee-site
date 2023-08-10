import { SortT } from '@/types/product.type'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  isActive: (sortByValue: SortT) => boolean
  sortValue: SortT
  handleSort: (sortByValue: SortT) => void
  endButton?: boolean
}

export default function SortButton({ children, sortValue, isActive, handleSort, endButton = false }: Props) {
  return (
    <>
      <button
        className={classNames(
          'h-8 px-2 text-xs sm:px-3 md:rounded-sm md:px-4 md:text-sm md:capitalize md:transition-all',
          {
            'md:bg-primary md:text-white md:hover:bg-opacity-90': isActive(sortValue),
            'md:bg-white md:text-gray-700 md:hover:bg-opacity-50': !isActive(sortValue),
          }
        )}
        onClick={() => handleSort(sortValue)}
      >
        {children}
      </button>
      {endButton === false && <div className="block h-1 w-1 rounded-full bg-gray-600 md:hidden"></div>}
    </>
  )
}

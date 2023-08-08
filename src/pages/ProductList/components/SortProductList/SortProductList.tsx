import { SetStateAction } from 'react'
import { Tooltip } from 'react-tooltip'

interface Props {
  setIsShowAside: React.Dispatch<SetStateAction<boolean>>
}

export default function SortProductList({ setIsShowAside }: Props) {
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
              <span className="ml-1 text-sm">Lọc</span>
            </button>
          </div>
          <Tooltip id="filter-btn" place="bottom" style={{ fontSize: '12px', padding: '8px' }} />
          {/* End Show Filter */}
          {/* Sort */}
          <p className="mr-1 hidden text-sm lg:block">Sắp xếp theo</p>
          <button className="h-8 px-3 text-xs md:rounded-sm md:bg-primary md:px-4 md:text-sm md:capitalize md:text-white md:transition-all md:hover:opacity-90">
            Phổ biến
          </button>
          <div className="block h-1 w-1 rounded-full bg-gray-600 md:hidden"></div>
          <button className="h-8 px-3 text-xs md:rounded-sm md:bg-primary md:px-4 md:text-sm md:capitalize md:text-white md:transition-all md:hover:opacity-90">
            Mới nhất
          </button>
          <div className="block h-1 w-1 rounded-full bg-gray-600 md:hidden"></div>
          <button className="h-8 px-3 text-xs md:rounded-sm md:bg-primary md:px-4 md:text-sm md:capitalize md:text-white md:transition-all md:hover:opacity-90">
            Bán chạy
          </button>
          <select className="h-8 bg-white pl-2 pr-4 text-xs outline-none hover:bg-gray-100 md:text-sm" defaultValue="">
            <option value="" disabled>
              Giá
            </option>
            <option value="price:asc">Thấp đến cao</option>
            <option value="price:desc">Cao đến thấp</option>
          </select>
        </div>
        {/* End Sort */}
        {/* Pagination */}
        <div className="ml-2 flex items-center">
          <div className="mr-2 text-xs md:mr-5 md:text-sm">
            <span className="text-primary">1</span>
            <span>/2</span>
          </div>
          {/* Previous */}
          <button
            className="h-8 rounded-bl-sm rounded-tl-sm bg-white px-3 shadow-sm transition-all hover:bg-gray-100 disabled:bg-white/50"
            disabled
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
          <button className="h-8 rounded-br-sm rounded-tr-sm bg-white px-3 shadow-sm transition-all hover:bg-gray-100">
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
        </div>
        {/* End Pagination */}
      </div>
    </div>
  )
}

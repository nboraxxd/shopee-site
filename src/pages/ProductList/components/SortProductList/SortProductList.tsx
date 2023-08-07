export default function SortProductList() {
  return (
    <div className="bg-gray-300/40 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Sort */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-1 hidden text-sm lg:block">Sắp xếp theo</p>
          <button className="h-8 rounded-sm bg-primary px-4 text-sm capitalize text-white transition-all hover:opacity-90">
            Phổ biến
          </button>
          <button className="h-8 rounded-sm bg-white px-4 text-sm capitalize transition-all hover:bg-gray-100">
            Mới nhất
          </button>
          <button className="h-8 rounded-sm bg-white px-4 text-sm capitalize transition-all hover:bg-gray-100">
            Bán chạy
          </button>
          <select className="h-8 bg-white pl-2 pr-4 text-sm outline-none hover:bg-gray-100" value="">
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
          <div className="mr-5">
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
          <button className="h-8 rounded-bl-sm rounded-tl-sm bg-white px-3 shadow-sm transition-all hover:bg-gray-100">
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

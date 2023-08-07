import { useScrollTop } from '@/hooks/useScrollTop'
import { AsideFilter, Product, SortProductList } from '@/pages/ProductList'

export default function ProductList() {
  useScrollTop()

  return (
    <div className="bg-secondary">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AsideFilter />
          </div>
          <div className="col-span-9">
            <SortProductList />
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="col-span-1">
                    <Product />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

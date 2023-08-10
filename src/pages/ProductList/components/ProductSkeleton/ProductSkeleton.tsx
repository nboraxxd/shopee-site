export default function ProductSkeleton() {
  return (
    <div role="status" className="max-w-sm animate-pulse overflow-hidden rounded border border-gray-200 shadow">
      {/* Image */}
      <div className="mb-4 flex h-48 items-center justify-center bg-gray-300"></div>
      {/* End Image */}
      {/* Content */}
      <div className="px-1 pb-2">
        {/* Title */}
        <div className="mb-2 h-2.5 rounded-full bg-gray-200" />
        <div className="mb-4 h-2.5 rounded-full bg-gray-200" />
        {/* End Title */}
        {/* Other */}
        <div className="mb-2.5 h-2 rounded-full bg-gray-200" />
        <div className="mb-2.5 h-2 rounded-full bg-gray-200" />
        {/* End Other */}
      </div>
      {/* End Content */}
    </div>
  )
}

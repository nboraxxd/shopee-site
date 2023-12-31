export default function ProductSkeleton() {
  return (
    <div role="status" className="max-w-sm animate-pulse overflow-hidden rounded border border-gray-200 shadow">
      {/* Image */}
      <div className="mb-4 flex h-48 items-center justify-center bg-gray-300">
        <img
          src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 54 61' fill='%23e5e4e4'%3E%3Cpath d='M51.2 16.9H38.7C38.7 11.6 36 .6 27 .5 17.4.4 15.2 12.4 15.2 16.9H2.8c-3.4 0-2.7 3.4-2.7 3.4l2.4 33s-.1 7.3 6.3 7.5h36.5c6.2-.4 6.3-7.5 6.3-7.5l2.4-33c0-.1.5-3.5-2.8-3.4zM27.1 4.2c7.1.2 7.9 11.7 7.7 12.6H19.1c-.1-.9.4-12.4 8-12.6zm9.1 44.6c-1 1.7-2.7 3-5 3.7-1.2.4-2.4.5-3.6.5-3.2 0-6.5-1.1-9.3-3.3-.8-.6-1-1.5-.5-2.3.2-.4.7-.7 1.2-.8.4-.1.9 0 1.2.3 3.2 2.4 8.3 4 11.9 1.6 1.4-.9 2.1-2.7 1.6-4.3-.5-1.6-2.2-2.7-3.5-3.4-1-.6-2.1-1-3.3-1.4-.9-.3-1.9-.7-2.9-1.2-2.4-1.2-4-2.6-4.8-4.2-1.2-2.3-.6-5.4 1.4-7.5 3.6-3.8 10-3.2 14-.4.9.6.9 1.7.4 2.5s-1.4.9-2.2.4c-2-1.4-4.4-2-6.4-1.7-2 .3-4.7 2-4.4 4.6.2 1.5 2 2.6 3.3 3.3.8.4 1.5.7 2.3.9 4.3 1.3 7.2 3.3 8.6 5.7 1.2 2.1 1.2 4.9 0 7z'/%3E%3C/svg%3E"
          alt="img-skeleton"
          className="h-20 w-20"
        />
      </div>
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

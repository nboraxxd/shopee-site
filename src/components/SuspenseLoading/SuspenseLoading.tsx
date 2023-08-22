import './styles.css'

export default function SuspenseLoading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="loader flex space-x-2 rounded-full p-4">
        <div className="h-3 w-3 animate-bounce rounded-full bg-primary" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-primary" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-primary" />
      </div>
    </div>
  )
}

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

// ErrorBoundary là 1 class
export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    // render 1 UI dự phòng phòng cho trường hợp nó lỗi
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // Nếu bị lỗi gì thì nó nhảy có thể console.log lỗi ra
    console.error('Uncaught error: ', error, errorInfo)
  }

  // Khi app bị lỗi thì những cái Link của react-router-dom không hoạt động được. Nên chính vì thế sử dụng thẻ a để chuyển trang.
  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main className="flex h-screen w-full flex-col items-center justify-center">
          <h1 className="text-9xl font-extrabold tracking-widest text-primary">500</h1>
          <div className="absolute rotate-12 rounded bg-[#1A2238] px-2 text-sm text-white">Something when wrong!</div>
          <button className="mt-5">
            <div className="text-prbg-primary group relative inline-block text-sm font-medium focus:outline-none focus:ring active:text-orange-500">
              <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-primary transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
              <span className="relative block border border-current bg-primary px-8 py-3">
                <a href="/" className="text-white">
                  Về Trang Chủ
                </a>
              </span>
            </div>
          </button>
        </main>
      )
    }

    return this.props.children
  }
}

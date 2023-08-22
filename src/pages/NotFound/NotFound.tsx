import { PATH } from '@/constants/path'
import { Link } from 'react-router-dom'

interface Props {
  wrapperClassname?: string
  title?: string
  linkText?: string
}

export default function NotFound(props: Props) {
  const { wrapperClassname = 'h-screen', title = 'Không tìm thấy trang', linkText = 'Về Trang Chủ' } = props

  return (
    <main className={`flex w-full flex-col items-center justify-center ${wrapperClassname}`}>
      <h1 className="text-9xl font-extrabold tracking-widest text-primary">404</h1>
      <div className="absolute rotate-12 rounded bg-[#1A2238] px-2 text-sm text-white">{title}</div>
      <button className="mt-5">
        <a className="text-prbg-primary group relative inline-block text-sm font-medium focus:outline-none focus:ring active:text-orange-500">
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-primary transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
          <span className="relative block border border-current bg-primary px-8 py-3">
            <Link to={PATH.home} className="text-white">
              {linkText}
            </Link>
          </span>
        </a>
      </button>
    </main>
  )
}

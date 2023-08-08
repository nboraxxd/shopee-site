import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'

export default function Product() {
  return (
    <Link to={PATH.home}>
      <div className="overflow-hidden rounded-sm bg-white shadow transition-all duration-200 hover:shadow-lg">
        <div className="relative w-full pt-[100%]">
          <img
            src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljmh7dm0vees5d_tn"
            alt="watch"
            className="absolute left-0 top-0 h-full w-full bg-white object-cover"
          />
        </div>
        <div className="overflow-hidden p-2">
          <div className="line-clamp-2 min-h-[2rem] text-xs">
            Đồng hồ thông minh Smart watch Hero One Pro Jola nghe gọi Bluetooth, đồng hồ thể thao đo nhịp tim, chuyên
            dụng thể thao
          </div>
          <div className="mt-3 flex items-center gap-[2px]">
            <div className="line-clamp-1 max-w-[50%] text-sm text-gray-400 line-through">
              <span>₫</span>
              <span>1.700.000</span>
            </div>
            <div className="ml-1 line-clamp-1 text-sm text-primary">
              <span>₫</span>
              <span>995.000</span>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: '40%' }}>
                  <svg
                    enable-background="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x="0"
                    y="0"
                    className="h-3 w-3 fill-yellow-300 text-yellow-300"
                  >
                    <polygon
                      points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                    ></polygon>
                  </svg>
                </div>
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                  className="h-3 w-3 fill-current text-gray-300"
                >
                  <polygon
                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
            </div>
            <div className="ml-2 flex items-center gap-[2px] text-sm">
              <span>Đã bán</span>
              <span>12,7k</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

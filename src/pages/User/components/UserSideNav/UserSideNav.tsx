import { PATH } from '@/constants/path'
import { Link } from 'react-router-dom'
import myAccountImg from '@/assets/images/my-account.png'
import changePasswordImg from '@/assets/images/change-password.png'
import purchasesHistoryImg from '@/assets/images/purchases-history.png'

export default function UserSideNav() {
  return (
    <aside className="md:col-span-3 lg:col-span-2">
      <div className="flex items-center border-b border-b-gray-200 py-4">
        <Link to={PATH.user.profile} className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <img
            src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-lkjvorq2n20a75_tn"
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </Link>
        <div className="ml-4">
          <p className="font-semibold">nhatbao606</p>
          <Link to={PATH.user.profile} className="mt-1 flex items-baseline">
            <svg width={12} height={12} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                fill="#9B9B9B"
                fillRule="evenodd"
              />
            </svg>
            <span className="ml-1">Sửa hồ sơ</span>
          </Link>
        </div>
      </div>

      <ul className="mt-7">
        <li className="flex items-center">
          <img src={myAccountImg} alt="my account" className="h-5 w-5" />
          <Link to={PATH.user.profile} className="ml-[0.625rem]">
            Tài khoản của tôi
          </Link>
        </li>
        <li className="mt-5 flex items-center">
          <img src={changePasswordImg} alt="change password" className="h-5 w-5" />
          <Link to={PATH.user.password} className="ml-[0.625rem]">
            Đổi mật khẩu
          </Link>
        </li>
        <li className="mt-5 flex items-center">
          <img src={purchasesHistoryImg} alt="order history" className="h-5 w-5" />
          <Link to={PATH.user.purchase} className="ml-[0.625rem]">
            Đơn hàng
          </Link>
        </li>
      </ul>
    </aside>
  )
}

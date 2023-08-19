import { PATH } from '@/constants/path'
import { Link, NavLink } from 'react-router-dom'
import myAccountImg from '@/assets/images/my-account.png'
import changePasswordImg from '@/assets/images/change-password.png'
import purchasesHistoryImg from '@/assets/images/purchases-history.png'
import classNames from 'classnames'

export default function UserSideNav() {
  return (
    <aside className="md:col-span-3 lg:col-span-2">
      <div className="flex items-center md:border-b md:border-b-gray-200 md:py-4">
        <NavLink to={PATH.user.profile} className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <img
            src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-lkjvorq2n20a75_tn"
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </NavLink>
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

      <ul className="mt-5 flex items-center justify-center rounded-sm bg-white py-3 shadow sm:gap-10 md:flex-col md:items-start md:gap-5 md:rounded-none md:bg-transparent md:py-0 md:shadow-none">
        <li className="-ml-2 flex items-center sm:ml-0">
          <img src={myAccountImg} alt="my account" className="hidden h-5 w-5 sm:block" />
          <NavLink
            to={PATH.user.profile}
            className={({ isActive }) =>
              classNames('px-2 text-xs sm:ml-[0.625rem] sm:px-0 md:px-0', { 'text-primary': isActive })
            }
          >
            Tài khoản của tôi
          </NavLink>
        </li>
        <li className="flex items-center">
          <img src={changePasswordImg} alt="change password" className="hidden h-5 w-5 sm:block" />
          <NavLink
            to={PATH.user.password}
            className={({ isActive }) =>
              classNames('px-2 text-xs sm:ml-[0.625rem] sm:px-0 md:px-0', { 'text-primary': isActive })
            }
          >
            Đổi mật khẩu
          </NavLink>
        </li>
        <li className="-mr-2 flex items-center sm:mr-0">
          <img src={purchasesHistoryImg} alt="order history" className="hidden h-5 w-5 sm:block" />
          <NavLink
            to={PATH.user.purchase}
            className={({ isActive }) =>
              classNames('px-2 text-xs sm:ml-[0.625rem] sm:px-0 md:px-0', { 'text-primary': isActive })
            }
          >
            Đơn hàng
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

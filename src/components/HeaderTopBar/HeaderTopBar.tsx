import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userApi } from '@/apis/user.api'
import { AppContext } from '@/contexts/app.context'
import { Popover } from '@/components/Popover'
import { PopoverContent } from '@/components/PopoverContent'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { PATH } from '@/constants/path'

export default function TopBarHeader() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AppContext)

  const { mutate } = useMutation({
    mutationFn: userApi.logout,
  })

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: (response) => {
        setIsAuthenticated(false)
        setUser(null)
        toast.success(response.data.message)
      },
    })
  }

  return (
    <ul className="-mx-2 flex items-center justify-end px-5">
      {/* Language Popover */}
      <Popover
        renderPopover={
          <div className="flex flex-col rounded-sm border border-gray-200 bg-white shadow-md">
            <PopoverContent>Tiếng Việt</PopoverContent>
            <PopoverContent>English</PopoverContent>
          </div>
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span className="mx-1 text-sm">Tiếng Việt</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </Popover>
      {/* End Language Popover */}
      {/* Auth Link */}
      {!isAuthenticated && (
        <>
          <li className="text-sm text-gray-50 transition-all hover:text-gray-200">
            <Link className="px-2" to={PATH.signup}>
              Đăng Ký
            </Link>
          </li>
          <li className="border-l border-l-gray-200 text-sm text-gray-50 transition-all hover:text-gray-200">
            <Link className="px-2" to={PATH.login}>
              Đăng Nhập
            </Link>
          </li>
        </>
      )}

      {/* End Auth Link */}
      {/* Account Popover */}
      {isAuthenticated && (
        <Popover
          renderPopover={
            <div className="flex flex-col rounded-sm border border-gray-200 bg-white shadow-md">
              <PopoverContent as={Link} to="#!">
                Tài khoản của tôi
              </PopoverContent>
              <PopoverContent as={Link} to="#!">
                Đơn mua
              </PopoverContent>
              <PopoverContent onClick={handleLogout}>Đăng xuất</PopoverContent>
            </div>
          }
          placement="bottom-end"
        >
          <div className="flex h-5 w-5 flex-shrink-0 items-end justify-center rounded-full border bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4 text-[#c6c6c6]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <span className="ml-2 line-clamp-1 min-w-[40px] max-w-[155px] break-all">{user?.email}</span>
        </Popover>
      )}
      {/* End Account Popover */}
    </ul>
  )
}

import { PATH } from '@/config/path'
import { Link } from 'react-router-dom'
export default function Register() {
  return (
    <div className="bg-primary">
      {/* Container */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          {/* Wrap Form */}
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm">
              <p className="text-2xl">Đăng ký</p>
              {/* Email Input */}
              <div className="mt-8">
                <input
                  type="text"
                  name="email"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-sm"
                  placeholder="Email"
                />
                <p className="mt-1 min-h-[1rem] text-xs text-red-600"></p>
              </div>
              {/* End Email Input */}
              {/* Password Input */}
              <div className="mt-3">
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-sm"
                  placeholder="Password"
                />
                <p className="mt-1 min-h-[1rem] text-xs text-red-600"></p>
              </div>
              {/* End Password Input */}
              {/* Confirm Password Input */}
              <div className="mt-3">
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-sm"
                  placeholder="Confirm password"
                />
                <p className="mt-1 min-h-[1rem] text-xs text-red-600"></p>
              </div>
              {/* End Confirm Password Input */}
              {/* Button */}
              <button className="mt-3 w-full rounded-sm bg-primary px-2 py-4 text-center uppercase text-white hover:opacity-95">
                Đăng ký
              </button>
              {/* End Button */}
              {/* Redirect Link */}
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                <Link to={PATH.login} className="ml-1 text-primary">
                  Đăng nhập
                </Link>
              </div>
              {/* End Redirect Link */}
            </form>
          </div>
          {/* End Wrap Form */}
        </div>
      </div>
      {/* End Container */}
    </div>
  )
}

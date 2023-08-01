import { PATH } from '@/config/path'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from '@/utils/rules'

interface IFormRegister {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormRegister>()

  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="bg-primary">
      {/* Container */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          {/* Wrap Form */}
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
              <p className="text-2xl">Đăng ký</p>
              {/* Email Input */}
              <div className="mt-8">
                <input
                  type="email"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-sm"
                  placeholder="Email"
                  autoComplete="email"
                  {...register('email', rules.email)}
                />
                <p className="mt-1 min-h-[1rem] text-xs text-red-600">{errors.email?.message}</p>
              </div>
              {/* End Email Input */}
              {/* Password Input */}
              <div className="mt-2">
                <input
                  type="password"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-sm"
                  placeholder="Password"
                  autoComplete="new-password"
                  {...register('password', rules.password)}
                />
                <p className="mt-1 min-h-[1rem] text-xs text-red-600">{errors.password?.message}</p>
              </div>
              {/* End Password Input */}
              {/* Confirm Password Input */}
              <div className="mt-2">
                <input
                  type="password"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-sm"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  {...register('confirm_password', rules.confirm_password)}
                />
                <p className="mt-1 min-h-[1rem] text-xs text-red-600">{errors.confirm_password?.message}</p>
              </div>
              {/* End Confirm Password Input */}
              {/* Button */}
              <button
                type="submit"
                className="mt-2 w-full rounded-sm bg-primary px-2 py-4 text-center uppercase text-white hover:opacity-95"
              >
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

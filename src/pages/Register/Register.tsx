import { useForm } from 'react-hook-form'
import { PATH } from '@/config/path'
import { Link } from 'react-router-dom'
import { registerSchema, registerType } from '@/utils/rules'
import { Input } from '@/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({ resolver: yupResolver(registerSchema) })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="bg-primary">
      {/* Container */}
      <div className="container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          {/* Wrap Form */}
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
              <p className="text-center text-2xl">Đăng ký</p>
              {/* Email Input */}
              <Input
                name="email"
                placeholder="Email"
                register={register}
                type="email"
                autoComplete="email"
                classNameWrapper="mt-8"
                errorMessage={errors.email?.message}
              />
              {/* End Email Input */}
              {/* Password Input */}
              <Input
                name="password"
                placeholder="Password"
                register={register}
                type="password"
                autoComplete="new-password"
                errorMessage={errors.password?.message}
              />
              {/* End Password Input */}
              {/* Confirm Password Input */}
              <Input
                name="confirm_password"
                placeholder="Confirm password"
                register={register}
                type="password"
                errorMessage={errors.confirm_password?.message}
              />
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

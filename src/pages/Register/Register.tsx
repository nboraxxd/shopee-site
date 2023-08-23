import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import { toast } from 'react-toastify'
import authenticationApi from '@/apis/authentication.api'
import { AppContext } from '@/contexts/app.context'
import { PATH } from '@/constants/path'
import { Schema, schema } from '@/utils/rules'
import { isAxiosUnprocessableEntityError } from '@/utils/utils'
import { ErrorResponse } from '@/types/utils.type'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

// tạo ra 1 schema mới lấy email, password và confirm_password
type LoginSchema = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: yupResolver(registerSchema) })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<LoginSchema, 'confirm_password'>) => authenticationApi.register(body),
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])

    registerMutation.mutate(body, {
      onSuccess: (response) => {
        setIsAuthenticated(true)
        setUser(response.data.data.user)
        toast.success(response.data.message)
        navigate(PATH.home)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<LoginSchema, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<LoginSchema, 'confirm_password'>, {
                message: formError[key as keyof Omit<LoginSchema, 'confirm_password'>],
                type: 'Server',
              })
            })
          }
        }
      },
    })
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
                type="password"
                autoComplete="email"
                classNameWrapper="relative mt-8"
                classNameInput="py-3 pl-3 pr-8 focus:border-gray-400"
                classNameEye="absolute right-2 top-3 h-5 w-5 cursor-pointer text-gray-500"
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
                classNameWrapper="relative mt-2"
                classNameInput="py-3 pl-3 pr-8 focus:border-gray-400"
                classNameEye="absolute right-2 top-3 h-5 w-5 cursor-pointer text-gray-500"
                errorMessage={errors.password?.message}
              />
              {/* End Password Input */}
              {/* Confirm Password Input */}
              <Input
                name="confirm_password"
                placeholder="Confirm password"
                register={register}
                type="password"
                classNameWrapper="relative mt-2"
                classNameInput="py-3 pl-3 pr-8 focus:border-gray-400"
                classNameEye="absolute right-2 top-3 h-5 w-5 cursor-pointer text-gray-500"
                errorMessage={errors.confirm_password?.message}
              />
              {/* End Confirm Password Input */}
              {/* Button */}
              <Button isLoading={registerMutation.isLoading} disabled={registerMutation.isLoading}>
                Đăng ký
              </Button>
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

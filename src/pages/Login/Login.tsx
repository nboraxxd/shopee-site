import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'

import authenticationApi from '@/apis/authentication.api'
import { PATH } from '@/constants/path'
import { Schema, schema } from '@/utils/rules'
import { isAxiosUnprocessableEntityError } from '@/utils/utils'
import { ErrorResponse } from '@/types/utils.type'
import { Input } from '@/components/Input'
import { AppContext } from '@/contexts/app.context'
import { Button } from '@/components/Button'
import { StateType } from '../ProductDetail/components/ProductDetail/ProductDetail'

// tạo ra 1 schema mới chỉ lấy email và password
type LoginSchema = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const { state } = useLocation()
  const typedState = state as StateType

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginSchema>({ resolver: yupResolver(loginSchema) })

  const loginMutation = useMutation({
    mutationFn: (body: LoginSchema) => authenticationApi.login(body),
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setIsAuthenticated(true)
        setUser(response.data.data.user)
        toast.success(response.data.message)
        navigate(typedState?.redirect || PATH.home)
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntityError<ErrorResponse<LoginSchema>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginSchema, {
                message: formError[key as keyof LoginSchema],
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
      <Helmet>
        <title>Đăng nhập | Shopee clone</title>
        <meta name="description" content="Đăng nhập vào dự án Shopee Clone" />
      </Helmet>
      {/* Container */}
      <div className="container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          {/* Wrap Form */}
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" noValidate onSubmit={onSubmit}>
              <p className="text-center text-2xl">Đăng nhập</p>
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
                classNameWrapper="relative mt-2"
                classNameInput="py-3 pl-3 pr-8 focus:border-gray-400"
                classNameEye="absolute right-2 top-3 h-5 w-5 cursor-pointer text-gray-500"
                errorMessage={errors.password?.message}
              />
              {/* End Password Input */}
              {/* Button */}
              <Button isLoading={loginMutation.isLoading} disabled={loginMutation.isLoading}>
                Đăng nhập
              </Button>
              {/* End Button */}
              {/* Redirect Link */}
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn mới biết đến Shopee?</span>
                <Link to={PATH.register} className="ml-1 text-primary">
                  Đăng ký
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

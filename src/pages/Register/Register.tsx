import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import { toast } from 'react-toastify'
import { authenticationApi } from '@/apis/authentication.api'
import { AppContext } from '@/contexts/app.context'
import { PATH } from '@/config/path'
import { schema, Schema } from '@/utils/rules'
import { isAxiosUnprocessableEntityError } from '@/utils/utils'
import { ErrorResponse } from '@/types/utils.type'
import { Input } from '@/components/Input'
import { AuthButton } from '@/components/AuthButton'

type FormData = Schema

export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authenticationApi.register(body),
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])

    registerMutation.mutate(body, {
      onSuccess: (response) => {
        setIsAuthenticated(true)
        toast.success(response.data.message)
        navigate(PATH.home)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
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
              <AuthButton isLoading={registerMutation.isLoading} disabled={registerMutation.isLoading}>
                Đăng ký
              </AuthButton>
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

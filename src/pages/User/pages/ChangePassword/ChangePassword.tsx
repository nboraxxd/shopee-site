import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { toast } from 'react-toastify'

import userApi, { BodyUpdateProfile } from '@/apis/user.api'
import { isAxiosUnprocessableEntityError } from '@/utils/utils'
import { ErrorResponse } from '@/types/utils.type'
import { userSchema } from '@/utils/rules'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

type PasswordSchema = {
  password: string | undefined
  new_password: string | undefined
  confirm_password: string | undefined
}

const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<PasswordSchema>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: '',
    },
    resolver: yupResolver(passwordSchema),
  })

  const updateProfileMutation = useMutation({ mutationFn: (body: BodyUpdateProfile) => userApi.updateProfile(body) })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    updateProfileMutation.mutate(omit(data, ['confirm_password']), {
      onSuccess: (response) => {
        toast.success(response.data.message)
        reset()
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<PasswordSchema>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof PasswordSchema, {
                message: formError[key as keyof PasswordSchema],
                type: 'Server',
              })
            })
          }
        }
      },
    })
  })

  return (
    <div className="mt-3 rounded-sm bg-white px-7 pb-20 shadow md:mt-0 md:px-4 lg:px-7">
      <div className="border-b border-b-gray-200 py-5">
        <h1 className="text-lg font-medium text-gray-700">Đổi mật khẩu</h1>
        <p className="mt-1 hidden text-sm text-gray-500 md:block">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>
      <form className="mx-auto mt-5 max-w-2xl md:mt-10" onSubmit={onSubmit}>
        {/* Old Password */}
        <div className="mt-2 flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
          <div className="mb-[0.125rem] text-gray-500 md:mb-5 md:w-1/4 md:text-right lg:w-1/5">Mật khẩu hiện tại</div>
          <Input
            classNameWrapper="relative md:w-3/4 lg:w-4/5 w-full"
            classNameInput="pl-3 pr-8 py-2"
            classNameEye="absolute right-2 top-[0.5625rem] h-5 w-5 cursor-pointer text-gray-500"
            placeholder="Mật khẩu hiện tại"
            name="password"
            type="password"
            register={register}
            errorMessage={errors.password?.message}
          />
        </div>
        {/* End Old Password */}
        {/* New Password */}
        <div className="mt-2 flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
          <div className="mb-[0.125rem] text-gray-500 md:mb-5 md:w-1/4 md:text-right lg:w-1/5">Mật khẩu mới</div>
          <Input
            classNameWrapper="relative md:w-3/4 lg:w-4/5 w-full"
            classNameInput="pl-3 pr-8 py-2"
            classNameEye="absolute right-2 top-[0.5625rem] h-5 w-5 cursor-pointer text-gray-500"
            placeholder="Mật khẩu mới"
            name="new_password"
            type="password"
            register={register}
            errorMessage={errors.new_password?.message}
          />
        </div>
        {/* End New Password */}
        {/* Confirm Password */}
        <div className="mt-2 flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
          <div className="mb-[0.125rem] text-gray-500 md:mb-5 md:w-1/4 md:text-right lg:w-1/5">Nhập lại mật khẩu</div>
          <Input
            classNameWrapper="relative md:w-3/4 lg:w-4/5 w-full"
            classNameInput="pl-3 pr-8 py-2"
            classNameEye="absolute right-2 top-[0.5625rem] h-5 w-5 cursor-pointer text-gray-500"
            placeholder="Nhập lại mật khẩu"
            name="confirm_password"
            type="password"
            register={register}
            errorMessage={errors.confirm_password?.message}
          />
        </div>
        {/* End Confirm Password */}
        {/* Save Button */}
        <div className="mt-4 flex flex-col md:mt-2 md:flex-row md:items-center md:gap-2 lg:gap-5">
          <div className="mb-[0.125rem] text-gray-500 md:mb-0 md:w-1/4 md:text-right lg:w-1/5"></div>
          <div className="md:w-3/4 lg:w-4/5">
            <Button
              className="rounded-sm px-5 py-2.5 text-base"
              type="submit"
              disabled={updateProfileMutation.isLoading}
              isLoading={updateProfileMutation.isLoading}
            >
              Lưu
            </Button>
          </div>
        </div>
        {/* End Save Button */}
      </form>
    </div>
  )
}

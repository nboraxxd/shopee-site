import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import userApi, { type BodyUpdateProfile } from '@/apis/user.api'
import { AppContext } from '@/contexts/app.context'
import { ErrorResponse } from '@/types/utils.type'
import { userSchema } from '@/utils/rules'
import { setUser } from '@/utils/token'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from '@/utils/utils'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import InputFile from '@/components/InputFile/InputFile'
import { DateSelect } from '@/pages/User/components/DateSelect'

// type ProfileSchema = Pick<UserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>

type ProfileSchema = {
  name: string | undefined
  phone: string | undefined
  address: string | undefined
  avatar: string | undefined
  date_of_birth: Date | undefined
}

type ProfileSchemaError = Omit<ProfileSchema, 'date_of_birth'> & {
  date_of_birth: string | undefined
}

const profileSchema = userSchema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar'])

export default function Profile() {
  const { user, setUser: setUserContext } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const imagePreview = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: userApi.getProfile })
  const profileData = profileQuery.data?.data.data

  const profileMutation = useMutation({ mutationFn: (body: BodyUpdateProfile) => userApi.updateProfile(body) })

  const uploadAvatarMutation = useMutation({ mutationFn: (body: FormData) => userApi.updateAvatar(body) })

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<ProfileSchema>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: '',
    },
    resolver: yupResolver(profileSchema),
  })

  const avatar = watch('avatar')

  useEffect(() => {
    if (profileData) {
      setValue('name', profileData.name)
      setValue('phone', profileData.phone)
      setValue('address', profileData.address)
      setValue('date_of_birth', profileData.date_of_birth ? new Date(profileData.date_of_birth) : new Date(1990, 0, 1))
      setValue('avatar', profileData.avatar)
    }
  }, [profileData, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadResponse = await uploadAvatarMutation.mutateAsync(form)

        avatarName = uploadResponse.data.data
        setValue('avatar', avatarName)
      }

      const response = await profileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName,
      })

      setUserContext(response.data.data)
      setUser(response.data.data)
      profileQuery.refetch()
      toast.success(response.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<ProfileSchemaError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof ProfileSchemaError, {
              message: formError[key as keyof ProfileSchemaError],
              type: 'Server',
            })
          })
        }
      }
    }
  })

  function onChangeFile(file?: File) {
    setFile(file)
  }

  return (
    <div className="mt-3 rounded-sm bg-white px-7 pb-20 shadow md:mt-0 md:px-4 lg:px-7">
      <div className="border-b border-b-gray-200 py-2.5 md:py-5">
        <h1 className="text-lg font-medium text-gray-700">Hồ Sơ Của Tôi</h1>
        <p className="mt-1 hidden text-sm text-gray-500 md:block">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <form className="mt-2.5 flex flex-col-reverse md:mt-5 md:flex-row md:items-start" onSubmit={onSubmit}>
        <div className="mt-6 grow md:mt-0 md:pr-3 lg:pr-12">
          <div className="flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-5 md:w-1/4 md:text-right lg:w-1/5">Email</div>
            <Input
              classNameWrapper="md:w-3/4 lg:w-4/5 w-full"
              classNameInput="px-3 py-2"
              disabled
              defaultValue={profileData?.email}
            />
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-5 md:w-1/4 md:text-right lg:w-1/5">Tên</div>
            <Input
              classNameWrapper="md:w-3/4 lg:w-4/5 w-full"
              classNameInput="px-3 py-2"
              placeholder="Bruce Wayne"
              name="name"
              register={register}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-5 md:w-1/4 md:text-right lg:w-1/5">Số điện thoại</div>
            <Input
              classNameWrapper="md:w-3/4 lg:w-4/5 w-full"
              classNameInput="px-3 py-2"
              placeholder="0987***321"
              name="phone"
              register={register}
              errorMessage={errors.phone?.message}
            />
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-5 md:w-1/4 md:text-right lg:w-1/5">Địa chỉ</div>
            <Input
              classNameWrapper="md:w-3/4 lg:w-4/5 w-full"
              classNameInput="px-3 py-2"
              placeholder="Gotham city"
              name="address"
              register={register}
              errorMessage={errors.address?.message}
            />
          </div>
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} onChange={field.onChange} value={field.value} />
            )}
          />
          <div className="mt-4 flex flex-col md:mt-2 md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-0 md:w-1/4 md:text-right lg:w-1/5"></div>
            <div className="md:w-3/4 lg:w-4/5">
              <Button className="rounded-sm px-5 py-2.5 text-base" type="submit" disabled={profileMutation.isLoading}>
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className="md:border-l md:border-l-gray-200 md:pl-1 lg:px-5">
          <div className="flex flex-col items-center">
            <div className="my-4 h-24 w-24 overflow-hidden rounded-full">
              <img
                src={imagePreview || getAvatarUrl(user?.avatar)}
                alt={user?.email || 'default avatar'}
                className={classNames('h-full w-full', {
                  'object-cover': user?.avatar,
                  'invert-[0.75]': !user?.avatar,
                })}
              />
            </div>
            <InputFile onChange={onChangeFile} />
            <div className="mt-3 md:text-[0.625rem] lg:text-sm">
              <p>Dung lượng file tối đa 1MB</p>
              <p>Định dạng: .JPEG, .PNG</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

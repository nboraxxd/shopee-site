import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import userApi from '@/apis/user.api'
import { userSchema } from '@/utils/rules'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

// type ProfileSchema = Pick<UserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>

type ProfileSchema = {
  name: string | undefined
  phone: string | undefined
  address: string | undefined
  avatar: string | undefined
  date_of_birth: Date | undefined
}

const profileSchema = userSchema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar'])

export default function Profile() {
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: userApi.getProfile })

  const {
    register,
    setValue,
    formState: { errors },
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

  const profileData = profileQuery.data?.data.data
  console.log('🔥 ~ Profile ~ profileData:', profileData)

  useEffect(() => {
    if (profileData) {
      setValue('name', profileData.name)
      setValue('phone', profileData.phone)
      setValue('address', profileData.address)
      setValue('date_of_birth', profileData.date_of_birth ? new Date(profileData.date_of_birth) : new Date(1990, 0, 1))
      setValue('avatar', profileData.avatar)
    }
  }, [profileData, setValue])

  return (
    <div className="mt-3 rounded-sm bg-white px-7 pb-20 shadow md:mt-0 md:px-4 lg:px-7">
      <div className="border-b border-b-gray-200 py-2.5 md:py-5">
        <h1 className="text-lg font-medium text-gray-700">Hồ Sơ Của Tôi</h1>
        <p className="mt-1 hidden text-sm text-gray-500 md:block">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <form className="mt-2.5 flex flex-col-reverse md:mt-5 md:flex-row md:items-start">
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
          <div className="mt-2 flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-0 md:w-1/4 md:text-right lg:w-1/5">Ngày sinh</div>
            <div className="flex justify-between gap-2 md:w-3/4 md:gap-2 lg:w-4/5 lg:gap-6">
              <select className="boder-black/10 h-10 w-1/3 rounded-sm border px-3">
                <option disabled>Ngày</option>
              </select>
              <select className="boder-black/10 h-10 w-1/3 rounded-sm border px-3">
                <option disabled>Tháng</option>
              </select>
              <select className="boder-black/10 h-10 w-1/3 rounded-sm border px-3">
                <option disabled>Năm</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:mt-6 md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-0 md:w-1/4 md:text-right lg:w-1/5"></div>
            <div className="md:w-3/4 lg:w-4/5">
              <Button className="rounded-sm px-5 py-2.5 text-base" type="submit">
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className="md:border-l md:border-l-gray-200 md:pl-1 lg:px-5">
          <div className="flex flex-col items-center">
            <div className="my-4 h-24 w-24">
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-lkjvorq2n20a75_tn"
                alt="avt"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <input type="file" accept=".jpg, .jpeg, .png*" className="hidden" />
            <button
              className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-500 shadow-sm transition hover:bg-gray-50"
              type="submit"
            >
              Chọn ảnh
            </button>
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

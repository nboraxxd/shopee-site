import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export default function Profile() {
  return (
    <div className="mt-3 rounded-sm bg-white px-7 pb-20 shadow md:mt-0 md:px-4 lg:px-7">
      <div className="border-b border-b-gray-200 py-2.5 md:py-5">
        <h1 className="text-lg font-medium text-gray-700">Hồ Sơ Của Tôi</h1>
        <p className="mt-1 hidden text-sm text-gray-500 md:block">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className="mt-2.5 flex flex-col-reverse md:mt-5 md:flex-row md:items-start">
        <form className="mt-6 grow md:mt-0 md:pr-3 lg:pr-12">
          <div className="flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-0 md:w-1/4 md:text-right lg:w-1/5">Email</div>
            <div className="w-full md:w-3/4 lg:w-4/5">
              <Input
                classNameWrapper="md:w-3/4 lg:w-4/5 w-full"
                classNameInput="px-3 py-2"
                classNameError="hidden"
                disabled
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col md:mt-6 md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-0 md:w-1/4 md:text-right lg:w-1/5">Tên</div>
            <Input classNameWrapper="md:w-3/4 lg:w-4/5 w-full" classNameInput="px-3 py-2" classNameError="hidden" />
          </div>
          <div className="mt-4 flex flex-col md:mt-6 md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-0 md:w-1/4 md:text-right lg:w-1/5">Số điện thoại</div>
            <Input classNameWrapper="md:w-3/4 lg:w-4/5 w-full" classNameInput="px-3 py-2" classNameError="hidden" />
          </div>
          <div className="mt-4 flex flex-col md:mt-6 md:flex-row md:items-center md:gap-2 lg:gap-5">
            <div className="mb-[0.125rem] text-gray-500 md:mb-0 md:w-1/4 md:text-right lg:w-1/5">Địa chỉ</div>
            <Input classNameWrapper="md:w-3/4 lg:w-4/5 w-full" classNameInput="px-3 py-2" classNameError="hidden" />
          </div>
          <div className="mt-4 flex flex-col md:mt-6 md:flex-row md:items-center md:gap-2 lg:gap-5">
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
          <Button className="mt-4 w-full rounded-sm py-2.5 text-lg md:mt-6">Lưu</Button>
        </form>
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
            <button className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-500 shadow-sm transition hover:bg-gray-50">
              Chọn ảnh
            </button>
            <div className="mt-3 md:text-[0.625rem] lg:text-sm">
              <p>Dung lượng file tối đa 1MB</p>
              <p>Định dạng: .JPEG, .PNG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

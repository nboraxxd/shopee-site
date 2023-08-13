import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }

  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Email chưa đúng định dạng')
    .min(5, 'Email phải có đối thiểu 5 ký tự')
    .max(160, 'Email chỉ được phép có đối đa 160 ký tự'),
  password: yup
    .string()
    .required('Vui lòng nhập password')
    .min(6, 'Password phải có đối thiểu 6 ký tự')
    .max(160, 'Password chỉ được phép có đối đa 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập lại password')
    .min(6, 'Password phải có đối thiểu 6 ký tự')
    .max(160, 'Password chỉ được phép có đối đa 160 ký tự')
    .oneOf([yup.ref('password')], 'Các mật khẩu đã nhập không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Khoảng giá không phù hợp',
    test: testPriceMinMax,
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Khoảng giá không phù hợp',
    test: testPriceMinMax,
  }),
  searchProduct: yup.string().trim().required(),
})

// Yup khai báo kiểu thế nào thì ta xuất ra type kiểu đó
export type Schema = yup.InferType<typeof schema>

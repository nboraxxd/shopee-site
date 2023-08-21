import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }

  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

function handleConfirmPasswordYup(ref: string) {
  return yup
    .string()
    .required('Vui lòng nhập lại password')
    .min(6, 'Password phải có tối thiểu 6 ký tự')
    .max(160, 'Password chỉ được phép có tối đa 160 ký tự')
    .oneOf([yup.ref(ref)], 'Các mật khẩu đã nhập không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Email chưa đúng định dạng')
    .min(5, 'Email phải có tối thiểu 5 ký tự')
    .max(160, 'Email chỉ được phép có tối đa 160 ký tự'),
  password: yup
    .string()
    .required('Vui lòng nhập password')
    .min(6, 'Password phải có tối thiểu 6 ký tự')
    .max(160, 'Password chỉ được phép có tối đa 160 ký tự'),
  confirm_password: handleConfirmPasswordYup('password'),
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

export const userSchema = yup.object({
  name: yup.string().max(160, 'Tên chỉ được phép có tối đa 160 ký tự'),
  phone: yup
    .string()
    .matches(/((84|0[3|5|7|8|9])+([0-9]{8})|(84[3|5|7|8|9])+([0-9]{8}))\b/, 'Số điện thoại chưa đúng định dạng'),
  address: yup.string().max(160, 'Địa chỉ được phép có tối đa 160 ký tự'),
  avatar: yup.string().max(1000, 'Avatar chỉ được phép có tối đa 160 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Ngày sinh không hợp lệ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >,
})

// Yup khai báo kiểu thế nào thì ta xuất ra type kiểu đó
export type Schema = yup.InferType<typeof schema>
export type UserSchema = yup.InferType<typeof userSchema>

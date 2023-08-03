import * as yup from 'yup'

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
})

// tạo ra 1 schema mới chỉ lấy email và password
export const loginSchema = schema.pick(['email', 'password'])

// Yup khai báo kiểu thế nào thì ta xuất ra type kiểu đó
export type Schema = yup.InferType<typeof schema>

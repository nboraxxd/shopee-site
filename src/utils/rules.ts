import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: 'Vui lòng nhập email',
    minLength: {
      value: 5,
      message: 'Email phải có đối thiểu 5 ký tự',
    },
    maxLength: {
      value: 160,
      message: 'Email chỉ được phép có đối đa 160 ký tự',
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email chưa đúng định dạng',
    },
  },

  password: {
    required: 'Vui lòng nhập password',
    minLength: {
      value: 6,
      message: 'Password phải có đối thiểu 6 ký tự',
    },
    maxLength: {
      value: 160,
      message: 'Password chỉ được phép có đối đa 160 ký tự',
    },
  },

  confirm_password: {
    required: 'Vui lòng nhập lại password',
    validate:
      typeof getRules === 'function'
        ? (value) => value === getValues?.('password') || 'Các mật khẩu đã nhập không khớp'
        : undefined,
  },
})

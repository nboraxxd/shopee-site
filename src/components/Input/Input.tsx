import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  classNameError?: string
}

export default function Input(props: Props) {
  const {
    name,
    placeholder,
    register,
    type = 'text',
    classNameWrapper = 'mt-2',
    autoComplete = 'off',
    rules,
    errorMessage,
    classNameInput = 'p-3 focus:border-gray-400',
    classNameError = 'min-h-[1rem]',
  } = props

  const registerResult = register && name ? register(name, rules) : {}

  return (
    <div className={classNameWrapper}>
      <input
        type={type}
        className={`w-full rounded-sm border border-gray-300 outline-none focus:shadow-sm ${classNameInput}`}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerResult}
      />
      <p className={`mt-1 text-xs text-red-600 ${classNameError}`}>{errorMessage}</p>
    </div>
  )
}

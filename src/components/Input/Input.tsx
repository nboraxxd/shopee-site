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
    register,
    classNameWrapper = 'mt-2',
    autoComplete = 'off',
    rules,
    errorMessage,
    classNameInput = 'p-3 focus:border-gray-400',
    classNameError = 'min-h-[1rem]',
    ...rest
  } = props

  const registerResult = register && name ? register(name, rules) : null

  return (
    <div className={classNameWrapper}>
      <input
        className={`w-full rounded-sm border border-gray-300 outline-none focus:shadow-sm ${classNameInput}`}
        autoComplete={autoComplete}
        {...registerResult}
        {...rest}
      />
      <p className={`mt-1 text-xs text-red-600 ${classNameError}`}>{errorMessage}</p>
    </div>
  )
}

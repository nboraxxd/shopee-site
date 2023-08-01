import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  name: string
  placeholder: string
  register: UseFormRegister<any>
  type?: React.HTMLInputTypeAttribute
  classNameWrapper?: string
  autoComplete?: string
  rules?: RegisterOptions
  errorMessage?: string
}

export default function Input({
  name,
  placeholder,
  register,
  type = 'text',
  classNameWrapper = 'mt-2',
  autoComplete = 'off',
  rules,
  errorMessage,
}: Props) {
  return (
    <div className={classNameWrapper}>
      <input
        type={type}
        className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-sm"
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <p className="mt-1 min-h-[1rem] text-xs text-red-600">{errorMessage}</p>
    </div>
  )
}

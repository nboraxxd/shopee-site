import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function (props, ref) {
  const {
    classNameWrapper = 'mt-2',
    errorMessage,
    classNameInput = 'w-full p-3 focus:border-gray-400',
    classNameError = 'min-h-[1rem]',
    onChange,
    value = '',
    ...rest
  } = props

  const [localValue, setLocalValue] = useState<string>(value as string)

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
      // Cập nhật localValue state
      setLocalValue(value)
    }
  }

  return (
    <div className={classNameWrapper}>
      <input
        className={`rounded-sm border border-gray-300 outline-none focus:shadow-sm ${classNameInput}`}
        onChange={handleInputChange}
        ref={ref}
        value={value === undefined ? localValue : value}
        {...rest}
      />
      <p className={`mt-1 text-xs text-red-600 ${classNameError}`}>{errorMessage}</p>
    </div>
  )
})

export default InputNumber

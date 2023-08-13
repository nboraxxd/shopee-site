import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'

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
    ...rest
  } = props

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }

  return (
    <div className={classNameWrapper}>
      <input
        className={`rounded-sm border border-gray-300 outline-none focus:shadow-sm ${classNameInput}`}
        onChange={handleInputChange}
        ref={ref}
        {...rest}
      />
      <p className={`mt-1 text-xs text-red-600 ${classNameError}`}>{errorMessage}</p>
    </div>
  )
})

export default InputNumber

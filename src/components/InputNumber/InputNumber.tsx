import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function (
  {
    classNameWrapper = 'mt-2',
    errorMessage,
    classNameInput = 'p-3 focus:border-gray-400',
    classNameError = 'min-h-[1rem]',
    onChange,
    ...rest
  },
  ref
) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }

  return (
    <div className={classNameWrapper}>
      <input
        className={`w-full rounded-sm border border-gray-300 outline-none focus:shadow-sm ${classNameInput}`}
        onChange={handleChange}
        ref={ref}
        {...rest}
      />
      <p className={`mt-1 text-xs text-red-600 ${classNameError}`}>{errorMessage}</p>
    </div>
  )
})

export default InputNumber

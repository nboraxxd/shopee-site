import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'

export type InputControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameWrapper?: string
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

export default function InputController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputControllerProps<TFieldValues, TName>) {
  const {
    type,
    onChange,
    classNameWrapper = 'mt-2',
    classNameInput = 'w-full p-3 focus:border-gray-400',
    classNameError = 'min-h-[1rem]',
    value = '',
    ...rest
  } = props

  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      // Cập nhật localValue state
      setLocalValue(valueFromInput)
      // Gọi field.onChange để cập nhật vào state React Hook Form
      field.onChange(event)
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }

  return (
    <div className={classNameWrapper}>
      <input
        className={`rounded-sm border border-gray-300 outline-none focus:shadow-sm ${classNameInput}`}
        {...rest}
        {...field}
        onChange={handleInputChange}
        value={localValue || value}
      />
      <p className={`mt-1 text-xs text-red-600 ${classNameError}`}>{fieldState.error?.message}</p>
    </div>
  )
}

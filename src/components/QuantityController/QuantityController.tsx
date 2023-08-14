import { ChangeEvent, useState } from 'react'
import { InputNumber, InputNumberProps } from '@/components/InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onDecrease?: (value: number) => void
  onIncrease?: (value: number) => void
  onType?: (value: number) => void
}

export default function QuantityController(props: Props) {
  const { max, onIncrease, onDecrease, onType, classNameWrapper = '', value, ...rest } = props

  const [localValue, setLocalValue] = useState<number>(Number(value || 1))

  function handleInputChange(ev: ChangeEvent<HTMLInputElement>) {
    let _value = Number(ev.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
    setLocalValue(_value)
  }

  function handleDecrease() {
    let _value = Number(value || localValue) - 1
    if (_value < 1) _value = 1

    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  function handleIncrease() {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) _value = max

    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className={`flex items-center ${classNameWrapper}`}>
      {/* Decrease Button */}
      <button
        className="flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300"
        onClick={handleDecrease}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>
      {/* End Decrease Button */}
      <InputNumber
        classNameWrapper=" "
        classNameInput="h-8 w-12 border-l-0 border-r-0 rounded-l-none rounded-r-none text-center"
        classNameError="hidden"
        onChange={handleInputChange}
        value={value || localValue}
        {...rest}
      />
      {/* Increase Button */}
      <button
        className="flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300"
        onClick={handleIncrease}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      {/* End Increase Button */}
    </div>
  )
}

import range from 'lodash/range'
import { useEffect, useState } from 'react'

interface Props {
  value?: Date
  onChange?: (value: Date) => void
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990,
  })

  useEffect(() => {
    if (value) {
      setDate({ day: value.getDate(), month: value.getMonth(), year: value.getFullYear() })
    }
  }, [value])

  function handleChangeSelect(ev: React.ChangeEvent<HTMLSelectElement>) {
    const { value: valueFromSelect, name } = ev.target
    const newDate = {
      day: value?.getDate() || date.day,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect),
    }

    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
  }

  return (
    <>
      <div className="mt-2 flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-5">
        <div className="mb-[0.125rem] text-gray-500 md:mb-5 md:w-1/4 md:text-right lg:w-1/5">Ngày sinh</div>
        <div className="md:w-3/4 lg:w-4/5">
          <div className="flex justify-between gap-2 lg:gap-6">
            <select
              className="boder-black/10 h-10 w-1/3 cursor-pointer rounded-sm border px-3 outline-none transition-all hover:border-gray-300"
              name="day"
              onChange={handleChangeSelect}
              value={value?.getDate() || date.day}
            >
              <option disabled>Ngày</option>
              {range(1, 32).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className="boder-black/10 h-10 w-1/3 cursor-pointer rounded-sm border px-3 outline-none transition-all hover:border-gray-300"
              name="month"
              onChange={handleChangeSelect}
              value={value?.getMonth() || date.month}
            >
              <option disabled>Tháng</option>
              {range(0, 12).map((item) => (
                <option key={item} value={item}>
                  Tháng {item + 1}
                </option>
              ))}
            </select>
            <select
              className="boder-black/10 h-10 w-1/3 cursor-pointer rounded-sm border px-3 outline-none transition-all hover:border-gray-300"
              name="year"
              onChange={handleChangeSelect}
              value={value?.getFullYear() || date.year}
            >
              <option disabled>Năm</option>
              {range(1904, 2024).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <p className={`mt-1 min-h-[1rem] text-xs text-red-600`}>{errorMessage}</p>
        </div>
      </div>
    </>
  )
}

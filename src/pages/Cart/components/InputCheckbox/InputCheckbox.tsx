import classNames from 'classnames'

interface Props {
  classNameInput?: string
  classNameChecked?: string
  checked: boolean
  handleChecked?: (ev: React.ChangeEvent<HTMLInputElement>) => void
  handleAllChecked?: () => void
}

export default function InputCheckbox({
  classNameInput = 'h-5 w-5',
  classNameChecked = 'h-3.5 w-3.5',
  checked = false,
  handleChecked,
  handleAllChecked,
}: Props) {
  return (
    <div className="inline-flex items-center">
      <label className="relative flex cursor-pointer items-center rounded-full">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChecked || handleAllChecked}
          className={`peer relative cursor-pointer appearance-none rounded border border-gray-200 transition-all checked:bg-primary focus:ring-2 focus:ring-primary/80 focus:ring-offset-2 ${classNameInput}`}
        />
        <div
          className={classNames(
            'pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100',
            { '-translate-y-2/4': true }
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classNameChecked}
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </label>
    </div>
  )
}

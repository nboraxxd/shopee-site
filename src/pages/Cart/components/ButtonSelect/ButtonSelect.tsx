import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  handleAllChecked?: () => void
  handleDeletePurchase?: () => void
  handleShowModal?: () => void
  className?: string
}

export default function ButtonSelect({
  children,
  handleAllChecked,
  handleDeletePurchase,
  handleShowModal,
  className = '',
}: Props) {
  return (
    <button
      className={`px-[0.375rem] py-[0.0625rem] ${className}`}
      onClick={handleAllChecked || handleDeletePurchase || handleShowModal}
    >
      {children}
    </button>
  )
}

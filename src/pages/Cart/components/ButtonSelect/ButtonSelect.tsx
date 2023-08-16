import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function ButtonSelect({ children, className = '' }: Props) {
  return <button className={`px-[0.375rem] py-[0.0625rem] ${className}`}>{children}</button>
}

import { type ElementType } from 'react'
import { type To } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
  as?: ElementType
  to?: To
  className?: string
  onClick?: () => void
}

export default function PopoverContent({
  children,
  as: Element = 'button',
  to,
  className = 'bg-white hover:bg-gray-100 hover:text-primary',
  onClick,
}: Props) {
  return (
    <Element to={to} className={`px-5 py-2.5 text-left transition-all ${className}`} onClick={onClick}>
      {children}
    </Element>
  )
}

import { type ElementType } from 'react'
import { type To } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
  as?: ElementType
  to?: To
  className?: string
}

export default function PopoverContent({ children, as: Element = 'button', to, className = '' }: Props) {
  return (
    <Element
      to={to}
      className={`bg-white px-5 py-2.5 text-left transition-all hover:bg-gray-100 hover:text-primary ${className}`}
    >
      {children}
    </Element>
  )
}

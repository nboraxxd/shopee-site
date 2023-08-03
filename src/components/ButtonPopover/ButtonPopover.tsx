import { type ElementType } from 'react'
import { type To } from 'react-router-dom'

interface Props {
  children?: string
  as?: ElementType
  to?: To
}

export default function ButtonPopover({ children, as: Element = 'button', to }: Props) {
  return (
    <Element
      to={to}
      className="border-t bg-white px-5 py-2.5 text-left transition-all first:border-t-0 hover:bg-gray-50 hover:text-primary"
    >
      {children}
    </Element>
  )
}

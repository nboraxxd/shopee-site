import { useRef, useState } from 'react'
import { FloatingArrow, FloatingPortal, arrow, offset, shift, useFloating } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  staticOffsetArrow?: string | number
  initialOpen?: boolean
}

export default function Popover({
  children,
  renderPopover,
  className = '',
  staticOffsetArrow,
  initialOpen = false,
}: Props) {
  const TOOLTIP_GAP = 3
  const [isOpen, setIsOpen] = useState(initialOpen)
  const arrowRef = useRef(null)
  const { refs, strategy, x, y, context, middlewareData } = useFloating({
    middleware: [
      shift(),
      arrow({
        element: arrowRef,
      }),
      offset(TOOLTIP_GAP),
    ],
  })

  const showPopover = () => {
    setIsOpen(true)
  }

  const hidePopover = () => {
    setIsOpen(false)
  }

  return (
    <li className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <FloatingPortal>
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.2,
              }}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill="white"
                height={10}
                width={20}
                staticOffset={staticOffsetArrow}
                style={{ zIndex: 1, bottom: '99%' }}
              />
              {renderPopover}
            </motion.div>
          </FloatingPortal>
        )}
      </AnimatePresence>
      {/* End Popover */}
    </li>
  )
}

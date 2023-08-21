import { ElementType, useRef, SetStateAction, useState } from 'react'
import { FloatingArrow, FloatingPortal, type Placement, arrow, offset, shift, useFloating } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface PopoverProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  classNameWrap?: string
  classNameArrow?: string
  crossAxis?: number
  staticOffsetArrow?: string | number
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  isShowPopover?: boolean
  setIsShowPopover?: React.Dispatch<SetStateAction<boolean>>
}

export default function Popover(props: PopoverProps) {
  const {
    children,
    renderPopover,
    classNameWrap = '',
    classNameArrow = '',
    crossAxis = 0,
    staticOffsetArrow,
    as: Element = 'li',
    initialOpen = false,
    placement = 'bottom',
    isShowPopover,
    setIsShowPopover,
  } = props

  const TOOLTIP_GAP = 3
  const [isOpen, setIsOpen] = useState(initialOpen)
  const arrowRef = useRef(null)
  const { refs, strategy, x, y, context, middlewareData } = useFloating({
    middleware: [
      shift(),
      arrow({
        element: arrowRef,
      }),
      offset({
        crossAxis: crossAxis,
        mainAxis: TOOLTIP_GAP,
      }),
    ],
    placement: placement,
  })

  const showPopover = () => {
    setIsShowPopover ? setIsShowPopover(true) : setIsOpen(true)
  }

  const hidePopover = () => {
    setIsShowPopover ? setIsShowPopover(false) : setIsOpen(false)
  }

  return (
    <Element
      className={`before:content[''] relative flex cursor-pointer items-center px-1 py-1 text-gray-50 transition-all before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:translate-y-full hover:text-gray-200 sm:px-2 ${classNameWrap}`}
      ref={refs.setReference}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      {children}
      {/* Popover */}
      <AnimatePresence>
        {((isShowPopover !== undefined && isShowPopover) || (isShowPopover === undefined && isOpen)) && (
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
                className={classNameArrow}
              />
              {renderPopover}
            </motion.div>
          </FloatingPortal>
        )}
      </AnimatePresence>
      {/* End Popover */}
    </Element>
  )
}

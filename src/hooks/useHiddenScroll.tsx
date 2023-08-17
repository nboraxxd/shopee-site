import { useEffect } from 'react'

export default function useHiddenScroll(isShowModal: boolean) {
  useEffect(() => {
    const body = document.body
    isShowModal ? body.classList.add('overflow-hidden') : body.classList.remove('overflow-hidden')

    return () => {
      body.classList.remove('overflow-hidden')
    }
  }, [isShowModal])
}

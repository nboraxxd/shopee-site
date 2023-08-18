import { useEffect } from 'react'

const useScrollTop = (dependencyList?: string[]) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList ?? [])
}

export default useScrollTop

import { useEffect } from 'react'

export const useScrollTop = (dependencyList: string[] = []) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [dependencyList])
}

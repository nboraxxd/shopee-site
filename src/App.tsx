import { useContext, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { routers } from '@/routers'
import { ToastContainer } from 'react-toastify'

import { localStorageEventTarget } from '@/utils/token'
import { AppContext } from '@/contexts/app.context'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const element = useRoutes(routers)
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLocalStorage', reset)

    return () => localStorageEventTarget.removeEventListener('clearLocalStorage', reset)
  }, [reset])

  return (
    <>
      {element}
      <ToastContainer autoClose={2000} position="top-center" limit={3} hideProgressBar />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App

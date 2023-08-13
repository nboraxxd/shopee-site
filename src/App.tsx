import { useRoutes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { routers } from '@/routers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const element = useRoutes(routers)

  return (
    <>
      {element}
      <ToastContainer autoClose={1500} position="top-center" limit={3} hideProgressBar />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App

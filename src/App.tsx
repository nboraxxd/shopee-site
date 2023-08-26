import { useContext, useEffect, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { routers } from '@/routers'
import '@/locales/translation/i18n'
import { localStorageEventTarget } from '@/utils/token'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ScrollToTop } from '@/components/ScrollTop'
import { SuspenseLoading } from '@/components/SuspenseLoading'
import { AppProvider, AppContext } from '@/contexts/app.context'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  const element = useRoutes(routers)
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLocalStorage', reset)

    return () => localStorageEventTarget.removeEventListener('clearLocalStorage', reset)
  }, [reset])

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ScrollToTop>
            <ErrorBoundary>
              <Suspense fallback={<SuspenseLoading />}>
                {element}
                <ToastContainer autoClose={2000} position="top-center" limit={3} hideProgressBar />
              </Suspense>
            </ErrorBoundary>
          </ScrollToTop>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App

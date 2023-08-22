// import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import { AppProvider } from '@/contexts/app.context'
import { ScrollToTop } from '@/components/ScrollTop'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import App from '@/App'
import '@/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ScrollToTop>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ScrollToTop>
      </AppProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
)

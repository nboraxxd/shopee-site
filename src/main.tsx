// import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import { AppProvider } from '@/contexts/app.context'
import { ScrollToTop } from '@/components/ScrollTop'
import App from '@/App'
import '@/index.css'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </AppProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
)

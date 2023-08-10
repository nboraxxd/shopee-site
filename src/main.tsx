// import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '@/contexts/app.context'
import App from '@/App'
import '@/index.css'
import ScrollToTop from './hooks/useScrollTop'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AppProvider>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </AppProvider>
  </BrowserRouter>
  // </React.StrictMode>
)

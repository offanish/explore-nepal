import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import { MainContextProvider } from './context/MainContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <QueryClientProvider client={queryClient}>
    <MainContextProvider>
      <App />
      <ReactQueryDevtools />
    </MainContextProvider>
  </QueryClientProvider>
)

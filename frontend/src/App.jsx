import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouteConfig from './routes/RouteConfig'
import { ToastProvider } from './components/Toast'

function App() {

  return (
    <BrowserRouter>
      <ToastProvider>
        <RouteConfig />
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App

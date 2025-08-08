import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouteConfig from './routes/RouteConfig'
import { ToastProvider } from './components/Toast'
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <RouteConfig />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App

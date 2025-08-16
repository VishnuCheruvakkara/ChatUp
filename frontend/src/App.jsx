import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouteConfig from './routes/RouteConfig'
import { ToastProvider } from './components/Toast'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import NavigationWrapper from './components/Navigation';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavigationWrapper>
          <ToastProvider>
            <RouteConfig />
          </ToastProvider>
        </NavigationWrapper>
      </BrowserRouter>
    </Provider>
  )
}

export default App

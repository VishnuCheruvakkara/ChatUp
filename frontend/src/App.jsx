import { useState } from 'react'
import { BrowserRouter} from 'react-router-dom'
import RouteConfig from './routes/RouteConfig'

function App() {

  return (
    <BrowserRouter>
      <RouteConfig/>
    </BrowserRouter>
  )
}

export default App

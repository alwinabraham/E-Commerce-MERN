import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Page from './Pages/Page/Page'
import AdminLogin from './Pages/Admin/AdminLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element= {<Register />} />
        <Route exact path="/login" element= {<Login />} />
        <Route exact path="/" element={<Page />} />
        <Route exact path="/AdminLogin" element={<AdminLogin />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App

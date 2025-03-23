import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Homepage from './pages/Homepage.jsx'
import Additem from './pages/Inventory_tharusha/Additem.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/User_gihan/Login.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/groceryinventory' element={<Additem/>} />
      <Route path='/register' element={<Login/>} />
      
      
    </Routes>
  
  
  </BrowserRouter>
)

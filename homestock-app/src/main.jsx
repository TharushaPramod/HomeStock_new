import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Homepage from './pages/Homepage.jsx'
import Additem from './pages/Inventory_tharusha/Additem.jsx'
import GroceryList from './pages/GroceryTracking/groceryList.jsx'
import AddItemtoGL from './pages/GroceryTracking/AdditemtoGL.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/groceryinventory' element={<Additem/>} />
      <Route path='/grocery-List' element={<GroceryList/>} />
      <Route path='/add-item-to-grocery-list' element={<AddItemtoGL/>}/>
      
      
    </Routes>
  
  
  </BrowserRouter>
)

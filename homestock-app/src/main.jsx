import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Homepage from './pages/Homepage.jsx'
import Additem from './pages/Inventory_tharusha/Additem.jsx'
import GroceryList from './pages/GroceryTracking/groceryList.jsx'
import AddItemtoGL from './pages/GroceryTracking/AdditemtoGL.jsx'
import EditGroceryItem from './pages/GroceryTracking/EditGroceryItems.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Register from './pages/User_gihan/Register.jsx'
import Reminder from './pages/Reminder_gihan/Reminder.jsx'
import Recipe from './pages/Recipe.jsx'




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/groceryinventory' element={<Additem/>} />

      <Route path='/grocery-List' element={<GroceryList/>} />
      <Route path='/add-item-to-grocery-list' element={<AddItemtoGL/>}/>
      <Route path="/edit-grocery/:id" element={<EditGroceryItem />} />

      <Route path='/register' element={<Register/>} />
      <Route path='/reminder' element={<Reminder/>} />
      <Route path='/recipe' element={<Recipe/>} />

      
      
    </Routes>
  
  
  </BrowserRouter>
)

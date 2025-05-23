import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Homepage from './pages/Homepage.jsx'
import Additem from './pages/Inventory_tharusha/Additem.jsx'
import GLDashboard from './pages/GroceryTracking/GLDashboard.jsx'
import GroceryListView from './pages/GroceryTracking/GroceryListView.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Register from './pages/User_gihan/Register.jsx'
import Reminder from './pages/Reminder_gihan/Reminder.jsx'
import Recipe from './pages/Recipe.jsx'
import CreateReminderPage from './pages/Reminder_gihan/CreateReminderPage.jsx'
import ViewReminderPage from './pages/Reminder_gihan/ViewReminderPage.jsx'
import UpdateReminderPage from './pages/Reminder_gihan/UpdateReminderPage.jsx'




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/groceryinventory' element={<Additem/>} />

      <Route path="/list-dashboard" element={<GLDashboard />} />
      <Route path="/list/:listId" element={<GroceryListView />} />

      <Route path='/register' element={<Register/>} />
      <Route path='/reminder' element={<Reminder/>} />
      <Route path='/recipe' element={<Recipe/>} />

      <Route path='/createreminder' element={<CreateReminderPage/>} />
      <Route path='/viewreminder' element={<ViewReminderPage/>} />
      <Route path="/updatereminder/:id" element={<UpdateReminderPage/>} />

      
      
    </Routes>
  
  
  </BrowserRouter>
)

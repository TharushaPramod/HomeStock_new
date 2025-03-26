import React from 'react'
import Api from '../api.jsx'
import Navbar from '../components/navbar/Navbar.jsx'
import Footer from '../components/Footer.jsx'


export default function Recipe() {
  return (
    <div>
        <Navbar></Navbar>
        <Api></Api>
        <Footer/>
      
    </div>
  )
}

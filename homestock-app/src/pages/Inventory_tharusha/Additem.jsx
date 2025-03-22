import React, { useState } from 'react'
import Itemform from '../../components/Inventory_com/Itemform'
import Navbar from '../../components/navbar/navbar'
import ItemTable from '../../components/Inventory_com/ItemTable';


const items = [
    {
      id: 1,
      name: 'Rice',
      qty: 5,
      weight: 1,
      price: 50,
      expireDate: '2025-12-31', // Date in YYYY-MM-DD format
    },
    {
      id: 2,
      name: 'Sugar',
      qty: 10,
      weight: 2,
      price: 30,
      expireDate: '2025-06-15', // Another example date
    },
  ];
export default function Additem() {

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
      };


  return (
    <div>
        <Navbar/>

        <div className="flex justify-center my-4">
        <button
          onClick={toggleForm}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          {showForm ? 'Hide Form' : 'Add Item'}
        </button>
      </div>

      {/* Conditionally render the form */}
      {showForm && <Itemform />}

      {/* Display the table */}
      <ItemTable rows={items} />
    
    
      
    </div>
  )
}

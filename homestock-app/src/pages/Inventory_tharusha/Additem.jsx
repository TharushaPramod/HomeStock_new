import React, { useEffect, useState } from 'react'
import Itemform from '../../components/Inventory_com/Itemform'
import Navbar from '../../components/navbar/navbar'
import ItemTable from '../../components/Inventory_com/ItemTable';

import Axios from 'axios';



export default function Additem() {

    const [items , setItems] = useState([]);
    const [submitted ,setSubmitted] = useState(false);
    const [isEdit ,setIsedit] = useState(false);
    const[selectedItem,setSelectedItem] = useState({});

    useEffect(()=>{
      getItems();
    },[]);

    const getItems = ()=>{
      Axios.get('http://localhost:3001/api/items')
        .then(response => {
          setItems(response.data?.response || []);
        } )
        .catch(error =>{
          console.log("Axios Error : ",error);
        })
    }

    const addItem = (data)=>{
      setSubmitted(true);
      
      const payload = {
        id : data.id,
        name : data.name,
        qty : data.qty,
        weight :data.weight,
        price : data.price,
        expireDate : data.expireDate 
      }
      Axios.post('http://localhost:3001/api/item',payload)
          .then(() => {
            getItems();
            setSubmitted(false);
            isEdit(false);
          } )
          .catch(error =>{
            console.log("Axios Error : ",error);
          })
    }

    const updateItem = (data)=>{
      setSubmitted(true);
      
      const payload = {
        id : data.id,
        name : data.name,
        qty : data.qty,
        weight :data.weight,
        price : data.price,
        expireDate : data.expireDate 
      }
      Axios.post('http://localhost:3001/api/updateitem',payload)
          .then(() => {
            getItems();
            setSubmitted(false);
            isEdit(false);
          } )
          .catch(error =>{
            console.log("Axios Error : ",error);
          })
    }

    const deleteItem = (data) =>{
      Axios.post('http://localhost:3001/api/deleteitem',data)
          .then(() => {
            getItems();
            
          } )
          .catch(error =>{
            console.log("Axios Error : ",error);
          })
    }



  

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
      {showForm && <Itemform addItem={addItem} submitted={submitted} data={selectedItem} isEdit={isEdit} updateItem={updateItem} /> }

      {/* Display the table */}
      <ItemTable  
          rows={items} 
          deleteItem ={data => window.confirm("Are you Sure ?") && deleteItem(data)}
          selectedItem={data => {
            setSelectedItem(data);
            setIsedit(true);
        
          }}/>
          
        
       
        
    
      
    </div>
  )
}

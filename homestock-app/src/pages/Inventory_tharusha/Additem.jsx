import React, { useEffect, useState } from 'react'
import Itemform from '../../components/Inventory_com/Itemform'
import Navbar from '../../components/navbar/Navbar'
import ItemTable from '../../components/Inventory_com/ItemTable';
import Axios from 'axios';
import Useform from '../../components/Inventory_com/Useform'
import Usetable from '../../components/Inventory_com/Usetable';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import InventorySummary from '../../components/Inventory_com/InventorySummary';
import Image01 from '../../images/home-image.png';
import Footer from '../../components/Footer';

export default function Additem() {
    const [items, setItems] = useState([]);
    const [useItems, setUseItems] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedUseItem, setSelectedUseItem] = useState({});
    const [activeTab, setActiveTab] = useState('add');

    
    useEffect(() => {
        getItems();
        getUseItems();
    }, []);

    const getItems = () => {
        Axios.get('http://localhost:3001/api/items')
            .then(response => {
                setItems(response.data?.response || []);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            })
    }

    const getUseItems = () => {
        Axios.get('http://localhost:3001/api/getUseItems')
            .then(response => {
                setUseItems(response.data?.response || []);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            })
    }

    const addItem = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
            qty: data.qty,
            weight: data.weight,
            price: data.price,
            expireDate: data.expireDate
        }
        Axios.post('http://localhost:3001/api/item', payload)
            .then(() => {
                getItems();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
                setSubmitted(false);
            })
    }

    const addUseItem = (data) => {
        setSubmitted(true);
        const payload = {
            useId: data.useId,
            useName: data.useName,
            useType:data.useType,
            useWeight: data.useWeight,
        }
        Axios.post('http://localhost:3001/api/addUseItem', payload)
            .then(() => {
                getUseItems();
                getItems(); 
                setSubmitted(false);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
                setSubmitted(false);
            })
    }

    const updateItem = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
            qty: data.qty,
            weight: data.weight,
            price: data.price,
            expireDate: data.expireDate
        }
        Axios.post('http://localhost:3001/api/updateitem', payload)
            .then(() => {
                getItems();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
                setSubmitted(false);
            })
    }

    const updateUseItem = (data) => {
        setSubmitted(true);
        const payload = {
            useId: data.useId,
            useName: data.useName,
            useType:data.useType,
            useWeight: data.useWeight,
        };
        Axios.post('http://localhost:3001/api/updateUseItem', payload)
            .then(() => {
                getUseItems();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
                setSubmitted(false);
            });
    };

    const deleteItem = (data) => {
        Axios.post('http://localhost:3001/api/deleteitem', data)
            .then(() => {
                getItems();
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            })
    }

    const deleteUseItem = (data) => {
        Axios.post('http://localhost:3001/api/deleteUseItem', data)
            .then(() => {
                getUseItems();
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            })
    }

    const getTotalWeightByName = () => {
        const weightMap = {};
        items.forEach((item) => {
            if (!weightMap[item.name]) {
                weightMap[item.name] = 0;
            }
            weightMap[item.name] += Number(item.weight) || 0;
        });
        return weightMap;
    };

    const getTotalUsedWeightByName = () => {
        const usedWeightMap = {};
        useItems.forEach((item) => {
            if (!usedWeightMap[item.useName]) {
                usedWeightMap[item.useName] = 0;
            }
            usedWeightMap[item.useName] += Number(item.useWeight) || 0;
        });
        return usedWeightMap;
    };

    const getInventorySummary = () => {
        const available = getTotalWeightByName();
        const used = getTotalUsedWeightByName();
        
        const allItemNames = new Set([
            ...Object.keys(available),
            ...Object.keys(used)
        ]);
        
        return Array.from(allItemNames).map(name => ({
            name,
            available: available[name] || 0,
            used: used[name] || 0,
            remaining: (available[name] || 0) - (used[name] || 0)
        }));
    };

    return (
        <div>
            <Navbar />
            
         
            <div className='flex items-center justify-center mt-10 '>
             <div className='w-[40%]'> 
             <img
                      src={Image01}
                      alt="Home Stock Illustration"
                      className="max-w-md mt-8 transition-transform duration-300 animate-fade-in hover:scale-105"
                    />
                    </div>   
            
                
                
                    <div className="table-wrapper w-[40%] mt-[50px] max-h-[300px] overflow-y-auto rounded-xl shadow-md ">
                    <table className="w-full overflow-hidden shadow-lg rounded-xl ">
                                    <thead className="sticky top-0 z-10 text-white bg-gradient-to-r from-green-600 to-emerald-600">
                                        <tr>
                                        <th className="py-3 text-base font-semibold text-center font-Poppins">
                                            Item Name
                                        </th>
                                        <th className="py-3 text-base font-semibold text-center font-Poppins">
                                            Quantity Type
                                        </th>
                                        <th className="py-3 text-base font-semibold text-center font-Poppins">
                                            Remaining
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {getInventorySummary().map((item, index) => {
                                        const qtyType = items.find(i => i.name === item.name)?.qty || 'Kg';
                                        return (
                                            <tr
                                            key={index}
                                            className={`hover:bg-gray-50 transition-colors duration-200 even:bg-gray-50/50 ${
                                                item.remaining < 0 ? 'bg-red-50' : ''
                                            }`}
                                            style={{ boxShadow: item.remaining < 0 ? 'inset 0 0 0 1px rgba(239, 68, 68, 0.2)' : 'none' }}
                                            >
                                            <td className="py-3 text-sm text-center text-gray-800 font-Poppins">
                                                {item.name}
                                            </td>
                                            <td className="py-3 text-sm text-center text-gray-800 font-Poppins">
                                                {qtyType}
                                            </td>
                                            <td className={`text-center font-Poppins text-sm py-3 ${
                                                item.remaining < 0 ? 'text-red-600 font-semibold' : 'text-gray-800'
                                            }`}>
                                                {item.remaining.toFixed(2)}
                                            </td>
                                            </tr>
                                        );
                                        })}
                                    </tbody>
                </table>
</div>
</div>
           

          {/* Tab Navigation and Pages */}
      <div className="flex flex-col items-center justify-center w-full px-4 mx-auto mb-20 max-w-7xl">
        {/* Tab Navigation */}
        <div className="w-full p-2 mt-8 bg-white shadow-lg rounded-t-xl">
          <div className="flex w-full space-x-2">
            <Button
              variant="contained"
              className={`flex-1 px-6 py-2 rounded-t-lg font-Poppins text-sm font-medium transition-all duration-300 ${
                activeTab === 'add'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:from-green-600 hover:to-emerald-700 hover:scale-102'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800 hover:scale-100'
              }`}
              onClick={() => setActiveTab('add')}
              aria-selected={activeTab === 'add'}
              role="tab"
            >
              Add Items
            </Button>
            <Button
              variant="contained"
              className={`flex-1 px-6 py-2 rounded-t-lg font-Poppins text-sm font-medium transition-all duration-300 ${
                activeTab === 'use'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:from-green-600 hover:to-emerald-700 hover:scale-102'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800 hover:scale-100'
              }`}
              onClick={() => setActiveTab('use')}
              aria-selected={activeTab === 'use'}
              role="tab"
            >
              Use Items
            </Button>
          </div>
        </div>

        {/* Tab Content as Separate Pages */}
      <Paper
  elevation={3}
  className={`w-full mt-[-1px] p-6 rounded-b-xl rounded-tr-xl transition-opacity duration-300 ${
    activeTab === 'add' ? 'opacity-100' : 'opacity-0 hidden'
  } bg-gray-200 text-gray-800`}
>
  <div className="min-h-[300px] bg-transparent">
    <h2 className="mb-4 text-xl font-semibold text-black font-Poppins">Add Items</h2>
    <Itemform
      addItem={addItem}
      submitted={submitted}
      data={selectedItem}
      isEdit={isEdit}
      updateItem={updateItem}
    />
    <ItemTable
      rows={items}
      deleteItem={(data) => window.confirm('Are you sure?') && deleteItem(data)}
      selectedItem={(data) => {
        setSelectedItem(data);
        setIsEdit(true);
      }}
    />
  </div>
</Paper>

<Paper
  elevation={3}
  className={`w-full mt-[-1px] p-6 rounded-b-xl rounded-tr-xl transition-opacity duration-300 ${
    activeTab === 'use' ? 'opacity-100' : 'opacity-0 hidden'
  } bg-gray-200 text-gray-800`}
>
  <div className="min-h-[300px] bg-transparent">
    <h2 className="mb-4 text-xl font-semibold text-black font-Poppins">Use Items</h2>
    <Useform
      addUseItem={addUseItem}
      submitted={submitted}
      items={items}
      useItems={useItems}
      data={selectedUseItem}
      isEdit={isEdit}
      updateUseItem={updateUseItem}
    />
    <Usetable
      rows={useItems}
      deleteUseItem={(data) => window.confirm('Are you sure?') && deleteUseItem(data)}
      selectedUseItem={(data) => {
        setSelectedUseItem(data);
        setIsEdit(true);
      }}
    />
  </div>
</Paper>
      </div>

                <Footer/>
            
        </div>
    )
}
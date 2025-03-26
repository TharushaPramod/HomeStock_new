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

export default function Additem() {
    const [items, setItems] = useState([]);
    const [useItems, setUseItems] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedUseItem, setSelectedUseItem] = useState({});
    const [activeTab, setActiveTab] = useState('add'); // 'add' or 'use'

    // Load data on component mount
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
                getItems(); // Refresh both lists
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
            
                
                
                                    <div className="table-wrapper w-[50%] mt-[50px] max-h-[300px] overflow-y-auto rounded-xl shadow-md ">
                                        <table className="w-full">
                                        <thead className="sticky top-0 z-10 text-center bg-green-600 bg-opacity-75">
                                            <tr className='text-center'>
                                            <th className='text-center font-Poppins text-[18px] font-semibold text-white py-2'>
                                                Item Name
                                            </th>
                                            <th className='text-center font-Poppins text-[18px] font-semibold text-white py-2'>
                                                Remaining 
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white bg-opacity-25 '>
                                            {getInventorySummary().map((item, index) => (
                                            <tr 
                                                key={index} 
                                                className={item.remaining < 0 ? 'negative' : '' }
                                            >
                                                <td className='text-center font-Poppins text-[16px] font-medium py-2 '>
                                                {item.name}
                                                </td>
                                                <td className='text-center font-Poppins text-[16px] font-medium py-2'>
                                                {item.remaining.toFixed(2)}
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                    </div>
</div>
           

            {/* Tab Navigation */}
            <div className="flex items-center justify-center mb-8">
                
  <div className="flex p-1 mt-10 space-x-1 bg-gray-100 rounded-lg shadow-inner">
                  
                    <Button
                    variant={activeTab === 'add' ? 'contained' : 'text'}
                    className={`px-6 py-2 rounded-md font-medium transition-all duration-200 font-Poppins
                         ${
                        activeTab === 'add' 
                        ? 'bg-green-600 text-white shadow-md hover:bg-green-700' 
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                             onClick={() => setActiveTab('add')}
                    >
                    Add Items
                    </Button>
    
                    <Button
                    variant={activeTab === 'use' ? 'contained' : 'text'}
                    className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                        activeTab === 'use' 
                        ? 'bg-green-600 text-white shadow-md hover:bg-green-700' 
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab('use')}
                    >
                    Use Items
                    </Button>
  </div>
</div>

            {/* Tab Content */}
            <div className="w-full tab-content ">
                {activeTab === 'add' ? (
                    <>
                        <Itemform
                            addItem={addItem}
                            submitted={submitted}
                            data={selectedItem}
                            isEdit={isEdit}
                            updateItem={updateItem}
                        />

                        <ItemTable
                            rows={items}
                            deleteItem={data => window.confirm("Are you Sure?") && deleteItem(data)}
                            selectedItem={data => {
                                setSelectedItem(data);
                                setIsEdit(true);
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Useform
                            addUseItem={addUseItem}
                            submitted={submitted}
                            items={items}
                            data={selectedUseItem}
                            isEdit={isEdit}
                            updateUseItem={updateUseItem}
                        />

                        <Usetable 
                            rows={useItems}
                            deleteUseItem={data => window.confirm("Are you Sure?") && deleteUseItem(data)}
                            selectedUseItem={data => {
                                setSelectedUseItem(data);
                                setIsEdit(true);
                            }}
                        />
                    </>
                )}
            </div>

            
        </div>
    )
}
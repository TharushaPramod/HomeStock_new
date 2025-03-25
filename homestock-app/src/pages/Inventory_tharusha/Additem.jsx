import React, { useEffect, useState } from 'react'
import Itemform from '../../components/Inventory_com/Itemform'
import Navbar from '../../components/navbar/navbar'
import ItemTable from '../../components/Inventory_com/ItemTable';
import Axios from 'axios';
import Useform from '../../components/Inventory_com/Useform'
import Usetable from '../../components/Inventory_com/Usetable';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
          
            <div className='flex items-center justify-center'>
               
                <TableContainer component={Paper} className="w-[50%] flex bg-white bg-opacity-60 mt-10">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            {/* <th>Added (kg)</th>
                            <th>Used (kg)</th> */}
                            <TableCell>Remaining (kg)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getInventorySummary().map((item, index) => (
                            <TableRow key={index} className={item.remaining < 0 ? 'negative' : ''}>
                                <TableCell>{item.name}</TableCell>
                                {/* <td>{item.available.toFixed(2)}</td>
                                <td>{item.used.toFixed(2)}</td> */}
                                <TableCell>{item.remaining.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                    </TableContainer>
    
            </div>
           

            {/* Tab Navigation */}
            <div className="flex items-center justify-center mb-8">
                
  <div className="flex p-1 mt-10 space-x-2 bg-gray-100 rounded-lg shadow-inner">
    <Button
      variant={activeTab === 'add' ? 'contained' : 'text'}
      className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
        activeTab === 'add' 
          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
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
          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
      }`}
      onClick={() => setActiveTab('use')}
    >
      Use Items
    </Button>
  </div>
</div>

            {/* Tab Content */}
            <div className="tab-content">
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
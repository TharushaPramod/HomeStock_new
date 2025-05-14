
import React, { useEffect, useState } from 'react';
import Itemform from '../../components/Inventory_com/Itemform';
import Navbar from '../../components/navbar/Navbar';
import ItemTable from '../../components/Inventory_com/ItemTable';
import Axios from 'axios';
import Useform from '../../components/Inventory_com/Useform';
import Usetable from '../../components/Inventory_com/Usetable';
import Image01 from '../../images/home-image.png';
import Footer from '../../components/Footer';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Additem() {
    const [items, setItems] = useState([]);
    const [useItems, setUseItems] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedUseItem, setSelectedUseItem] = useState({});
    const [activeTab, setActiveTab] = useState('add');
    const [searchQuery, setSearchQuery] = useState('');

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
            });
    };

    const getUseItems = () => {
        Axios.get('http://localhost:3001/api/getUseItems')
            .then(response => {
                setUseItems(response.data?.response || []);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            });
    };

    const addItem = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
            qty: data.qty,
            weight: data.weight,
            price: data.price,
            expireDate: data.expireDate
        };
        Axios.post('http://localhost:3001/api/item', payload)
            .then(() => {
                getItems();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
                setSubmitted(false);
            });
    };

    const addUseItem = (data) => {
        setSubmitted(true);
        const payload = {
            useId: data.useId,
            useName: data.useName,
            useType: data.useType,
            useWeight: data.useWeight,
        };
        Axios.post('http://localhost:3001/api/addUseItem', payload)
            .then(() => {
                getUseItems();
                getItems();
                setSubmitted(false);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
                setSubmitted(false);
            });
    };

    const updateItem = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
            qty: data.qty,
            weight: data.weight,
            price: data.price,
            expireDate: data.expireDate
        };
        Axios.post('http://localhost:3001/api/updateitem', payload)
            .then(() => {
                getItems();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
                setSubmitted(false);
            });
    };

    const updateUseItem = (data) => {
        setSubmitted(true);
        const payload = {
            useId: data.useId,
            useName: data.useName,
            useType: data.useType,
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
            });
    };

    const deleteUseItem = (data) => {
        Axios.post('http://localhost:3001/api/deleteUseItem', data)
            .then(() => {
                getUseItems();
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            });
    };

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

    const filteredInventorySummary = getInventorySummary().filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(16);
        doc.text('Inventory Summary', 14, 20);
        
        // Prepare table data
        const tableData = filteredInventorySummary.map(item => {
            const qtyType = items.find((i) => i.name === item.name)?.qty || 'Kg';
            return [
                item.name,
                qtyType,
                item.remaining.toFixed(2)
            ];
        });

        // Define table columns
        const columns = [
            { header: 'Item Name', dataKey: 'name' },
            { header: 'Unit', dataKey: 'unit' },
            { header: 'Remaining', dataKey: 'remaining' }
        ];

        // Generate table
        autoTable(doc, {
            startY: 30,
            head: [columns.map(col => col.header)],
            body: tableData,
            theme: 'striped',
            headStyles: {
                fillColor: [16, 185, 129], // Tailwind's emerald-500
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            bodyStyles: {
                textColor: [55, 65, 81], // Tailwind's gray-700
            },
            alternateRowStyles: {
                fillColor: [249, 250, 251] // Tailwind's gray-50
            },
            columnStyles: {
                remaining: {
                    cellWidth: 40,
                    halign: 'right',
                    textColor: item => item[2] < 0 ? [220, 38, 38] : [55, 65, 81] // Red for negative, gray-700 otherwise
                }
            }
        });

        // Save the PDF
        doc.save('inventory_summary.pdf');
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            
            {/* Hero Section */}
            <div className="container px-4 py-12 mx-auto">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            src={Image01}
                            alt="Inventory Illustration"
                            className="w-full max-w-md mx-auto transition-transform duration-300 transform hover:scale-105"
                        />
                    </div>
                    <div className="md:w-1/2 bg-white rounded-2xl shadow-xl p-6 max-h-[400px] overflow-y-auto">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Inventory Summary</h2>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search by item name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-48 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <button
                                    onClick={generatePDF}
                                    className="px-4 py-2 text-white rounded-lg bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    Download PDF
                                </button>
                            </div>
                        </div>
                        <table className="w-full">
                            <thead className="text-white bg-gradient-to-r from-emerald-500 to-green-600">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-left">Item Name</th>
                                    <th className="px-4 py-3 font-semibold text-left">Unit</th>
                                    <th className="px-4 py-3 font-semibold text-left">Remaining</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredInventorySummary.length > 0 ? (
                                    filteredInventorySummary.map((item, index) => {
                                        const qtyType = items.find((i) => i.name === item.name)?.qty || 'Kg';
                                        return (
                                            <tr 
                                                key={index}
                                                className={`hover:bg-gray-50 transition-colors duration-200 ${item.remaining < 0 ? 'bg-red-50' : ''}`}
                                            >
                                                <td className="px-4 py-3 text-gray-700">{item.name}</td>
                                                <td className="px-4 py-3 text-gray-700">{qtyType}</td>
                                                <td className={`py-3 px-4 ${item.remaining < 0 ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>
                                                    {item.remaining.toFixed(2)}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-4 py-3 text-center text-gray-500">
                                            No items found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Tab Navigation and Content */}
            <div className="container px-4 pb-20 mx-auto">
                {/* Tab Navigation */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex overflow-hidden bg-white shadow-sm rounded-xl">
                        <button
                            className={`px-8 py-3 text-sm font-medium transition-all duration-300 ${
                                activeTab === 'add'
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            onClick={() => setActiveTab('add')}
                        >
                            Add Items
                        </button>
                        <button
                            className={`px-8 py-3 text-sm font-medium transition-all duration-300 ${
                                activeTab === 'use'
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            onClick={() => setActiveTab('use')}
                        >
                            Use Items
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-8 transition-opacity duration-300 bg-gray-100 shadow-xl rounded-2xl">
                    {activeTab === 'add' && (
                        <div className="animate-fade-in">
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Add Items</h2>
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
                    )}
                    {activeTab === 'use' && (
                        <div className="animate-fade-in">
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Use Items</h2>
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
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

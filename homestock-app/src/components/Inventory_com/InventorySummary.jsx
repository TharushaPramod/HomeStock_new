import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const InventorySummary = () => {
    const [items, setItems] = useState([]);
    const [useItems, setUseItems] = useState([]);

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
        <div className='flex items-center justify-center'>
            <div className="w-1/2 mt-[50px] max-h-[300px] overflow-y-auto rounded-xl shadow-md">
                <table className="w-full">
                    <thead className="sticky top-0 z-10 bg-green-600 bg-opacity-75">
                        <tr>
                            <th className="py-2 text-lg font-semibold text-center text-white font-Poppins">
                                Item Name
                            </th>
                            <th className="py-2 text-lg font-semibold text-center text-white font-Poppins">
                                Remaining (kg)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-green-50">
                        {getInventorySummary().map((item, index) => (
                            <tr 
                                key={index}
                                className={item.remaining < 0 ? 'bg-red-100' : ''}
                            >
                                <td className="text-center font-Poppins text-[15px] font-medium py-2">
                                    {item.name}
                                </td>
                                <td className="text-center font-Poppins text-[15px] font-medium py-2">
                                    {item.remaining.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventorySummary;
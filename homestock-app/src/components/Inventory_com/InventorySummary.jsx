import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
            <TableContainer component={Paper} className="w-[50%] flex bg-white bg-opacity-60 mt-10">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Remaining (kg)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getInventorySummary().map((item, index) => (
                            <TableRow key={index} className={item.remaining < 0 ? 'negative' : ''}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.remaining.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default InventorySummary;
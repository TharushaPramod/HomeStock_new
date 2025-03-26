import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GroceryTable = ({ items, onDelete, onEdit }) => {  // Add onEdit to props
    return(
        <TableContainer 
            component={Paper} 
            className="shadow-xl rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 overflow-hidden"
            style={{
                boxShadow: "0px 4px 20px rgba(34, 197, 94, 0.3)",
            }}
            >
            <Table>
                <TableHead className="bg-white/60 backdrop-blur-md">
                    <TableRow>
                        <TableCell className="font-bold text-gray-800">Name</TableCell>
                        <TableCell className="font-bold text-gray-800">Quantity</TableCell>
                        <TableCell className="font-bold text-gray-800">Category</TableCell>
                        <TableCell className="font-bold text-gray-800">Status</TableCell>
                        <TableCell className="font-bold text-gray-800">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) =>(
                        <TableRow 
                            key={item._id}  // Use _id instead of id
                            className="hover:bg-green-100 transition duration-300"
                            >
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>
                                <IconButton 
                                    aria-label="edit" 
                                    color="primary"
                                    onClick={() => onEdit(item._id)}  // Use the onEdit prop
                                >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton 
                                    aria-label="delete" 
                                    color="error" 
                                    onClick={() => onDelete(item._id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GroceryTable;
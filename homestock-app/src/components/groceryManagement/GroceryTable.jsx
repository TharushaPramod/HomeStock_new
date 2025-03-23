import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GroceryTable = ({ items, onDelete }) => {
    return(
        <TableContainer component={Paper} className="shadow-lg">
            <Table>
                <TableHead className="bg-gray-200">
                    <TableRow>
                        <TableCell className="font-bold"> Name </TableCell>
                        <TableCell className="font-bold"> Quantity </TableCell>
                        <TableCell className="font-bold"> Category </TableCell>
                        <TableCell className="font-bold"> Status </TableCell>
                        <TableCell className="font-bold"> Action </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) =>(
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" color="primary">
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="delete" color="error" onClick={() => onDelete(item.id)}>
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
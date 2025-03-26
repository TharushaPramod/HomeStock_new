import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";

const Usetable = ({ rows, selectedUseItem, deleteUseItem }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter rows based on search term
    const filteredRows = rows.filter(row => 
        row.useName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Debug: Log the rows to check data
    console.log('Table rows:', rows);

    return (
        <div className="flex justify-center mt-5 rounded-lg">
            <div className="flex justify-center w-[100%] rounded-lg">
                <div className="w-[90%] bg-green-100 rounded-lg">
                    {/* Search Input */}
                    <div className="flex justify-end m-4">
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[300px]"
                        />
                    </div>

                    <TableContainer component={Paper} className="bg-white rounded-xl">
                        <Table>
                            <TableHead className="bg-green-600 bg-opacity-75">
                                <TableRow>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">ID</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">Name</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">Type</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">QTY</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRows.length > 0 ? (
                                    filteredRows.map(row => (
                                        <TableRow key={row.useId} className="bg-green-50">
                                            <TableCell component="th" className="text-[15px] font-Poppins text-center font-medium">
                                                {row.useId}
                                            </TableCell>
                                            <TableCell component="th" className="text-[15px] font-Poppins text-center font-medium">
                                                {row.useName}
                                            </TableCell>
                                            <TableCell component="th" className="text-[15px] font-Poppins text-center font-medium">
                                                {row.useType } 
                                            </TableCell>
                                            <TableCell component="th" className="text-[15px] font-Poppins text-center font-medium">
                                                {row.useWeight}
                                            </TableCell>
                                            <TableCell component="th" className="text-[15px] font-Poppins text-center font-medium space-x-1">
                                                <Button
                                                    
                                                    onClick={() => selectedUseItem({
                                                        useId: row.useId,
                                                        useName: row.useName,
                                                        useType: row.useType,
                                                        useWeight: row.useWeight
                                                    })}
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                   className="text-xl text-white bg-blue-500 shadow-md hover:bg-blue-700 font-Poppins text-[14px]
                                                                    animate-fade-in hover:scale-105 transition-transform duration-300"
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    onClick={() => deleteUseItem({ useId: row.useId })}
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    className="text-xl text-white bg-red-500 shadow-md hover:bg-red-700 font-Poppins text-[14px]
                                                                    animate-fade-in hover:scale-105 transition-transform duration-300"
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center font-Poppins text-[15px] font-medium">
                                            {searchTerm ? "No matching items found" : "No data"}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default Usetable;
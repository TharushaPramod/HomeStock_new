import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ItemTable = ({ rows, selectedItem, deleteItem }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter rows based on search term
    const filteredRows = rows.filter(row => 
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to generate and download PDF
    const generatePDF = () => {
        console.log("Generating PDF...");
        console.log("Filtered Rows:", filteredRows);

        if (filteredRows.length === 0) {
            alert("No data available to generate PDF.");
            return;
        }

        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.text("Inventory Items Report", 14, 22);

        // Define table columns and data
        const tableColumns = [
            { header: "ID", dataKey: "id" },
            { header: "Name", dataKey: "name" },
            { header: "Qty Type", dataKey: "qty" },
            { header: "Quantity", dataKey: "weight" },
            { header: "Price", dataKey: "price" },
            { header: "Expire Date", dataKey: "expireDate" },
        ];

        const tableRows = filteredRows.map(row => ({
            id: row.id,
            name: row.name,
            qty: row.qty,
            weight: row.weight,
            price: row.price,
            expireDate: new Date(row.expireDate).toLocaleDateString(),
        }));

        console.log("Table Columns:", tableColumns);
        console.log("Table Rows:", tableRows);

        // Generate table using autoTable
        autoTable(doc, {
            columns: tableColumns,
            body: tableRows,
            startY: 30,
            theme: "striped",
            headStyles: { fillColor: [67, 160, 71] },
            styles: { fontSize: 10 },
            columnStyles: {
                id: { cellWidth: 20 },
                name: { cellWidth: 40 },
                qty: { cellWidth: 30 },
                weight: { cellWidth: 30 },
                price: { cellWidth: 30 },
                expireDate: { cellWidth: 40 },
            },
        });

        // Save the PDF
        doc.save("inventory-items.pdf");
    };

    return (
        <div className="flex justify-center mt-5 mb-12 rounded-lg">
            <div className="flex justify-center w-[90%] rounded-lg">
                <div className="w-full rounded-lg">
                    <div className="flex items-center justify-between mt-4 mb-1">
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[300px] bg-white bg-opacity-80 rounded-3xl"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                    '&:hover fieldset': {
                                        border: 'none',
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: 'none',
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            className="text-white bg-green-600 hover:bg-green-700 font-Poppins text-[12px] animate-fade-in hover:scale-105 transition-transform duration-300"
                            onClick={generatePDF}
                            size="small"
                        >
                            Download PDF
                        </Button>
                    </div>

                    <TableContainer component={Paper} className="w-full bg-white bg-opacity-50 rounded-xl">
                        <Table className="items-center justify-around flex-auto">
                            <TableHead className="bg-green-600 bg-opacity-75">
                                <TableRow className="text-center">
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">ID</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">Name</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">Qty Type</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">Quantity</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">Price</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">Expire Date</TableCell>
                                    <TableCell className="font-semibold text-[18px] font-Poppins text-center text-white">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRows.length > 0 ? (
                                    filteredRows.map(row => (
                                        <TableRow key={row.id} className="bg-green-100 ">
                                            <TableCell component='th' className="text-[15px] font-Poppins text-center font-medium">
                                                {row.id}
                                            </TableCell>
                                            <TableCell component='th' className="text-[15px] font-Poppins text-center font-medium">
                                                {row.name}
                                            </TableCell>
                                            <TableCell component='th' className="text-[15px] font-Poppins text-center font-medium">
                                                {row.qty}
                                            </TableCell>
                                            <TableCell component='th' className="text-[15px] font-Poppins text-center font-medium">
                                                {row.weight}
                                            </TableCell>
                                            <TableCell component='th' className="text-[15px] font-Poppins text-center font-medium">
                                                {row.price}
                                            </TableCell>
                                            <TableCell component='th' className="text-[15px] font-Poppins text-center font-medium">
                                                {new Date(row.expireDate).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center space-x-1">
                                                    <Button
                                                        variant="contained"
                                                        className="text-xl text-white bg-blue-500 shadow-md hover:bg-blue-700 font-Poppins text-[12px]
                                                                    animate-fade-in hover:scale-105 transition-transform duration-300"
                                                        onClick={() => selectedItem({
                                                            id: row.id,
                                                            name: row.name,
                                                            qty: row.qty,
                                                            weight: row.weight,
                                                            price: row.price,
                                                            expireDate: row.expireDate
                                                        })}
                                                        size="small"
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        className="text-xl text-white bg-red-500 shadow-md hover:bg-red-700 font-Poppins text-[12px]
                                                                    animate-fade-in hover:scale-105 transition-transform duration-300"
                                                        onClick={() => deleteItem({ id: row.id })}
                                                        size="small"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center font-Poppins text-[15px] font-medium">
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
}

export default ItemTable;
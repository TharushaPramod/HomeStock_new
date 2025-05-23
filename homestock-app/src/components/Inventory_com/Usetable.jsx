import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, InputAdornment } from "@mui/material";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SearchIcon from "@mui/icons-material/Search";
import InventoryIcon from "@mui/icons-material/Inventory";

const Usetable = ({ rows, selectedUseItem, deleteUseItem }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter rows based on search term
    const filteredRows = rows.filter(row => 
        row.useName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to generate and download PDF
    const generatePDF = () => {
        if (filteredRows.length === 0) {
            alert("No data available to generate PDF.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Used Items Report", 14, 22);

        const tableColumns = [
            { header: "ID", dataKey: "useId" },
            { header: "Name", dataKey: "useName" },
            { header: "Type", dataKey: "useType" },
            { header: "QTY", dataKey: "useWeight" },
        ];

        const tableRows = filteredRows.map(row => ({
            useId: row.useId,
            useName: row.useName,
            useType: row.useType,
            useWeight: row.useWeight,
        }));

        autoTable(doc, {
            columns: tableColumns,
            body: tableRows,
            startY: 30,
            theme: "striped",
            headStyles: { fillColor: [34, 139, 87], textColor: [255, 255, 255] },
            styles: { fontSize: 10, textColor: [33, 33, 33] },
            columnStyles: {
                useId: { cellWidth: 20 },
                useName: { cellWidth: 50 },
                useType: { cellWidth: 50 },
                useWeight: { cellWidth: 30 },
            },
        });

        doc.save("used-items.pdf");
    };

    return (
        <div className="flex justify-center px-4 py-5 mt-8 mb-5 border-2 border-white rounded-xl">
            <div className="w-full max-w-6xl">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                    <TextField
                        label="Search Items"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-xs bg-white rounded-lg shadow-sm"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon className="text-gray-400" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                '& fieldset': { borderColor: '#e2e8f0' },
                                '&:hover fieldset': { borderColor: '#34d399' },
                                '&.Mui-focused fieldset': { borderColor: '#34d399' },
                            },
                            '& .MuiInputLabel-root': { color: '#6b7280' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#34d399' },
                        }}
                    />
                    <Button
                        variant="contained"
                        className="px-6 py-2 text-sm text-white transition-all duration-300 transform rounded-lg shadow-md bg-gradient-to-r from-green-500 to-emerald-600 font-Poppins hover:from-green-600 hover:to-emerald-700 hover:scale-105"
                        onClick={generatePDF}
                    >
                        Download PDF
                    </Button>
                </div>

                {/* Table Section */}
                <TableContainer component={Paper} className="overflow-x-auto bg-white shadow-lg rounded-xl">
                    <Table>
                        <TableHead>
                            <TableRow className="bg-gradient-to-r from-green-600 to-emerald-600">
                                <TableCell className="text-base font-semibold text-center text-white font-Poppins">ID</TableCell>
                                <TableCell className="text-base font-semibold text-center text-white font-Poppins">Name</TableCell>
                                <TableCell className="text-base font-semibold text-center text-white font-Poppins">Type</TableCell>
                                <TableCell className="text-base font-semibold text-center text-white font-Poppins">QTY</TableCell>
                                <TableCell className="text-base font-semibold text-center text-white font-Poppins">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.length > 0 ? (
                                filteredRows.map(row => (
                                    <TableRow
                                        key={row.useId}
                                        className="transition-colors duration-200 hover:bg-gray-50 even:bg-gray-50/50"
                                        sx={{ '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' } }}
                                    >
                                        <TableCell className="text-sm text-center text-gray-800 font-Poppins">{row.useId}</TableCell>
                                        <TableCell className="text-sm text-center text-gray-800 font-Poppins">{row.useName}</TableCell>
                                        <TableCell className="text-sm text-center text-gray-800 font-Poppins">{row.useType}</TableCell>
                                        <TableCell className="text-sm text-center text-gray-800 font-Poppins">{row.useWeight}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-center space-x-2">
                                                <Button
                                                    variant="contained"
                                                    className="px-4 py-1 text-xs text-white transition-all duration-300 transform rounded-md shadow-sm bg-gradient-to-r from-blue-500 to-indigo-600 font-Poppins hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
                                                    onClick={() => selectedUseItem({
                                                        useId: row.useId,
                                                        useName: row.useName,
                                                        useType: row.useType,
                                                        useWeight: row.useWeight
                                                    })}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    className="px-4 py-1 text-xs text-white transition-all duration-300 transform rounded-md shadow-sm bg-gradient-to-r from-red-500 to-rose-600 font-Poppins hover:from-red-600 hover:to-rose-700 hover:scale-105"
                                                    onClick={() => deleteUseItem({ useId: row.useId })}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <InventoryIcon className="mb-2 text-5xl text-gray-400" />
                                            <span className="text-lg text-gray-500 font-Poppins">
                                                {searchTerm ? "No matching items found" : "No used items available"}
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Usetable;
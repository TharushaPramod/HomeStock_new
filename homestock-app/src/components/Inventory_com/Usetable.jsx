import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Usetable = ({ rows, selectedUseItem, deleteUseItem }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter rows based on search term
    const filteredRows = rows.filter(row => 
        row.useName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Debug: Log the rows to check data
    console.log('Table rows:', rows);

    // Function to generate and download PDF
    const generatePDF = () => {
        console.log("Generating PDF for Usetable...");
        console.log("Filtered Rows:", filteredRows);

        if (filteredRows.length === 0) {
            alert("No data available to generate PDF.");
            return;
        }

        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.text("Used Items Report", 14, 22);

        // Define table columns and data
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

        console.log("Table Columns:", tableColumns);
        console.log("Table Rows:", tableRows);

        // Generate table using autoTable
        autoTable(doc, {
            columns: tableColumns,
            body: tableRows,
            startY: 30,
            theme: "striped",
            headStyles: { fillColor: [67, 160, 71] }, // Green color matching table header
            styles: { fontSize: 10 },
            columnStyles: {
                useId: { cellWidth: 20 },
                useName: { cellWidth: 50 },
                useType: { cellWidth: 50 },
                useWeight: { cellWidth: 30 },
            },
        });

        // Save the PDF
        doc.save("used-items.pdf");
    };

    return (
        <div className="flex justify-center mt-5 mb-12 rounded-lg ">
            <div className="flex justify-center w-[100%] rounded-lg">
                <div className="w-[90%] rounded-lg">
                    {/* Search Input and Download Button */}
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
                                        border: 'none', // Removes the outline
                                    },
                                    '&:hover fieldset': {
                                        border: 'none', // Removes outline on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: 'none', // Removes outline when focused
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

                    <TableContainer component={Paper} className="rounded-xl">
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
                                        <TableRow key={row.useId} className="bg-green-100">
                                            <TableCell component="th" className="text-[15px] font-Poppins text-center font-medium">
                                                {row.useId}
                                            </TableCell>
                                            <TableCell component="th" className="text-[15px] font-Poppins text-center font-medium">
                                                {row.useName}
                                            </TableCell>
                                            <TableCell component="th" className="text-[15px] font-Poppins text-center font-medium">
                                                {row.useType} 
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
                                                    className="text-xl text-white bg-blue-500 shadow-md hover:bg-blue-700 font-Poppins text-[12px]
                                                               animate-fade-in hover:scale-105 transition-transform duration-300"
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    onClick={() => deleteUseItem({ useId: row.useId })}
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    className="text-xl text-white bg-red-500 shadow-md hover:bg-red-700 font-Poppins text-[12px]
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
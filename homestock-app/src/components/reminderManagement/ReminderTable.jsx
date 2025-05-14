// import { useState } from "react";
// import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box } from "@mui/material";

// const ReminderTable = ({ rows, selectedReminder, deleteReminder }) => {
//     const [searchTerm, setSearchTerm] = useState('');

//     // Filter rows based on search term
//     const filteredRows = rows.filter(row => 
//         row.itemName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <TableContainer component={Paper} className="max-w-4xl p-4 mx-auto rounded-lg shadow-md mt-[-400px] mb-52">
//             <Box className="flex flex-col gap-4">
//                 {/* Header with title on left and search on right */}
//                 <Box className="flex items-center justify-between mb-4">
//                     <h2 className="text-xl font-bold text-black">Reminders</h2>
//                     <TextField
//                         label="Search by Item Name"
//                         variant="outlined"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         size="small"
//                         sx={{ maxWidth: 300 }}
//                     />
//                 </Box>

//                 <Table>
//                     {/* Table Head */}
//                     <TableHead className="bg-green-600">
//                         <TableRow>
//                             <TableCell className="font-semibold text-white">ID</TableCell>
//                             <TableCell className="font-semibold text-white">Item Name</TableCell>
//                             <TableCell className="font-semibold text-white">Threshold Weight (kg)</TableCell>
//                             <TableCell className="font-semibold text-center text-white">Action</TableCell>
//                         </TableRow>
//                     </TableHead>

//                     {/* Table Body */}
//                     <TableBody>
//                         {filteredRows.length > 0 ? (
//                             filteredRows.map((row) => (
//                                 <TableRow key={row.id} className="hover:bg-gray-100">
//                                     <TableCell>{row.id}</TableCell>
//                                     <TableCell>{row.itemName}</TableCell>
//                                     <TableCell>{row.thresholdWeight}</TableCell>
//                                     <TableCell className="text-center">
//                                         <Button
//                                             variant="contained"
//                                             className="mr-2 text-white bg-blue-500 hover:bg-blue-600"
//                                             onClick={() => selectedReminder({ id: row.id, itemName: row.itemName, thresholdWeight: row.thresholdWeight })}
//                                         >
//                                             Update
//                                         </Button>
//                                         <Button
//                                             variant="contained"
//                                             className="text-white bg-red-500 hover:bg-red-600"
//                                             onClick={() => deleteReminder({ id: row.id })}
//                                         >
//                                             Delete
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan="6" className="p-4 text-center text-gray-600">
//                                     {searchTerm ? "No matching reminders found" : "No Data Available"}
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </Box>
//         </TableContainer>
//     );
// };

// export default ReminderTable;
import React from 'react'

export default function ReminderTable() {
    return (
        <div>ReminderTable</div>
    )
}
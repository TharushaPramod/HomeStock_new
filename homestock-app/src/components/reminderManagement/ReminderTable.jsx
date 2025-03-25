import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ReminderTable = ({ rows, selectedReminder, deleteReminder }) => {
    return (
        <TableContainer component={Paper} className="max-w-4xl p-4 mx-auto mt-10 rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold text-center text-gray-800">Reminders</h2>

            <Table>
                {/* Table Head */}
                <TableHead className="bg-cyan-400">
                    <TableRow>
                        <TableCell className="font-semibold text-white">ID</TableCell>
                        <TableCell className="font-semibold text-white">Item Name</TableCell>
                        <TableCell className="font-semibold text-white">Current Weight (kg)</TableCell>
                        <TableCell className="font-semibold text-white">Threshold Weight (kg)</TableCell>
                        <TableCell className="font-semibold text-white">Reminder Date</TableCell>
                        <TableCell className="font-semibold text-center text-white">Action</TableCell>
                    </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <TableRow key={row.id} className="hover:bg-gray-100">
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.itemName}</TableCell>
                                <TableCell>{row.currentWeight}</TableCell>
                                <TableCell>{row.thresholdWeight}</TableCell>
                                <TableCell>{new Date(row.reminderDate).toLocaleDateString()}</TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant="contained"
                                        className="mr-2 text-white bg-blue-500 hover:bg-blue-600"
                                        onClick={() => selectedReminder({ id: row.id, itemName: row.itemName, currentWeight: row.currentWeight, thresholdWeight: row.thresholdWeight, reminderDate: row.reminderDate })}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="text-white bg-red-500 hover:bg-red-600"
                                        onClick={() => deleteReminder({ id: row.id })}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="6" className="p-4 text-center text-gray-600">
                                No Data Available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReminderTable;

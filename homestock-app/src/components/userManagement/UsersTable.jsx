import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UsersTable = ({ rows, selectedUser, deleteUser }) => {
    return (
        <TableContainer component={Paper} className="max-w-4xl p-4 mx-auto mt-10 rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold text-center text-gray-800">Users Table</h2>

            <Table>
                {/* Table Head */}
                <TableHead className="bg-cyan-400">
                    <TableRow>
                        <TableCell className="font-semibold text-white">ID</TableCell>
                        <TableCell className="font-semibold text-white">Username</TableCell>
                        <TableCell className="font-semibold text-white">Email</TableCell>
                        <TableCell className="font-semibold text-white">Phone</TableCell>
                        <TableCell className="font-semibold text-white">Password</TableCell>
                        <TableCell className="font-semibold text-white">Type</TableCell>
                        <TableCell className="font-semibold text-center text-white">Action</TableCell>
                    </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <TableRow key={row.id} className="hover:bg-gray-100">
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.password}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell className="text-center">
                                    <Button variant="contained" className="mr-2 text-white bg-blue-500 hover:bg-blue-600"
                                        onClick={() => selectedUser({ id: row.id, username: row.username, email: row.email, phone: row.phone, password: row.password })}

                                    >
                                        Update
                                    </Button>
                                    <Button variant="contained" className="text-white bg-red-500 hover:bg-red-600"
                                        onClick={() => deleteUser({ id: row.id })}

                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="5" className="p-4 text-center text-gray-600">
                                No Data Available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;

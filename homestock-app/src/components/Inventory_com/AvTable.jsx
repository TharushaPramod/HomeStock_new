import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const ItemTable = ({rows }) =>{

return(
    <div className="flex justify-center ">
    <TableContainer component={Paper} className="w-[90%]  bg-white bg-opacity-60 mt-10">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Use</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rows.length > 0 ? rows.map(row =>(
                        <TableRow key={row.id}>

                                <TableCell component='th'>{row.id}</TableCell>

                                <TableCell component='th'>{row.name}</TableCell>

                                                                                      
                                <TableCell component='th'>{row.weight}</TableCell>

                                <TableCell component='th'><Button>Use weight</Button></TableCell>
                                                        
                            
                            
                        </TableRow>
                        
                    )) : (
                        <TableRow>
                            <TableCell component='th'>No data</TableCell>
                        </TableRow>
                     )
            
            }
            </TableBody>
        </Table>

    </TableContainer>
    </div>

        );

}

export default ItemTable;
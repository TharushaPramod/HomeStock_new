import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const ItemTable = ({rows , selectedUseItem , deleteUseItem }) =>{

return(
    <div className="flex justify-center ">
    <TableContainer component={Paper} className="w-[90%]  bg-white bg-opacity-60 mt-10">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Weight</TableCell>
                  
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rows.length > 0 ? rows.map(row =>(
                        <TableRow key={row.useId}>

                                <TableCell component='th'>{row.useId}</TableCell>

                                <TableCell component='th'>{row.useName}</TableCell>

                                                                                      
                                <TableCell component='th'>{row.useWeight}</TableCell>

                                <TableCell component='th'>
                                <Button
                                       onClick={() => selectedUseItem({
                                        useId: row.useId,
                                        useName: row.useName,
                                        useWeight: row.useWeight
                                    })}
                                     >Update
                                    </Button>
                                     
                                    <Button
                                        onClick={()=>deleteUseItem({
                                            useId: row.useId
                                        })}
                                    >Deletes
                                    </Button>
                                </TableCell>

                               
                                                        
                            
                            
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
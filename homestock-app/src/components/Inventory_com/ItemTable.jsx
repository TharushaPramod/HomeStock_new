import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const ItemTable = ({rows ,selectedItem, deleteItem}) =>{

return(
    <div className="flex justify-center ">
    <TableContainer component={Paper} className="w-[90%]  bg-white bg-opacity-60 mt-10">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Expire Date</TableCell>
                    <TableCell>Actions</TableCell>
                    {/* <TableCell>Use</TableCell>
                    <TableCell>Avaialble</TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rows.length > 0 ? rows.map(row =>(   // rows map for row
                        <TableRow key={row.id}>

                                <TableCell component='th'>{row.id}</TableCell>

                                <TableCell component='th'>{row.name}</TableCell>

                             
                                <TableCell component='th'>{row.qty}</TableCell>

                               
                                <TableCell component='th'>{row.weight}</TableCell>

                               
                                <TableCell component='th'>{row.price}</TableCell>

                                
                                <TableCell component='th'>{new Date(row.expireDate).toLocaleDateString()}</TableCell>
                              
                                <TableCell>
                                    
                                    <Button
                                        onClick={()=>selectedItem({id: row.id , name: row.name , qty : row.qty , weight:row.weight,price:row.price,expireDate:row.expireDate})}
                                     >Update
                                    </Button>
                                     
                                    <Button
                                        onClick={()=>deleteItem({id:row.id})}
                                    >Delete
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
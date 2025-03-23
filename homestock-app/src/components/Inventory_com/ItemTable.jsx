import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const ItemTable = ({rows ,selectedItem, deleteItem}) =>{

return(
    <div className="flex justify-center ">
    <TableContainer component={Paper} className="w-[90%]  bg-white bg-opacity-60">
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
                    <TableCell>Use</TableCell>
                    <TableCell>Avaialble</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rows.length > 0 ? rows.map(row =>(
                        <TableRow key={row.id}>

                                <TableCell component='th'>{row.id}</TableCell>

                                <TableCell component='th'>{row.name}</TableCell>

                             
                                <TableCell component='th'>{row.qty}</TableCell>

                               
                                <TableCell component='th'>{row.weight}</TableCell>

                               
                                <TableCell component='th'>{row.price}</TableCell>

                                
                                <TableCell component='th'>{row.expireDate}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={()=>selectedItem({id: row.id , name: row.name , qty : row.qty , weight:row.weight,price:row.price,expireDate:row.expireDate})}
                                     >Update</Button>
                                    <Button
                                        onClick={()=>deleteItem({id:row.id})}
                                    >Delete</Button>
                                </TableCell>
                                
                                <TableCell>
                                    <TextField
                                    size="small"
                                    className="w-full max-w-[100px]"
                                    sx={{
                                                    '& .MuiInputBase-root': {
                                                      height: '30px', // Reduce height
                                                      fontSize: '12px', // Reduce font size
                                                      padding: '4px 8px', // Reduce padding
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                      fontSize: '12px', // Reduce label font size
                                                      transform: 'translate(14px, 8px) scale(1)', // Adjust label position
                                                    },
                                                    '& .MuiInputLabel-shrink': {
                                                      transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when shrunk
                                                    },
                                                  }}
                                    
                                    
                                    ></TextField>
                                    <Button>Reduce</Button>
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
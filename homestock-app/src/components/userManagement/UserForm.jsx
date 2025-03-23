import { Button, Grid2, Input, Typography } from "@mui/material";
import { useState } from "react";

const UserForm = props => {

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    
    return (
        <Grid2
            container
            spacing={2}
            className = "m-20 bg-white"
            sx={{
                display: 'block',

            }}
        >
            <Grid2 item xs={12}>
                <Typography component={'h1'} className="text-black">User Form</Typography>
            </Grid2>


            <Grid2 item xs={12} sm={6}sx={{display:'flex'}}>
                <Typography
                    component={'label'}
                    htmlFor="id"
                    sx={{
                        color: '#000000',
                        marginRight: '20px',
                        fontSize: '16px',
                        width: '100px',
                        display: 'block',
                    }}
                >
                    ID
                </Typography>

                <Input
                    type="number"
                    id="id"
                    name="id"
                    sx={{
                        width: '400px'
                    }}
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
            </Grid2>



            <Grid2 item xs={12} sm={6}sx={{display:'flex'}}>
                <Typography
                    component={'label'}
                    htmlFor="name"
                    sx={{
                        color: '#000000',
                        marginRight: '20px',
                        fontSize: '16px',
                        width: '100px',
                        display: 'block',
                    }}
                >
                    NAME
                </Typography>

                <Input
                    type="text"
                    id="name"
                    name="name"
                    sx={{
                        width: '400px'
                    }}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Grid2>

            <Button
                className="m-auto mt-20 mb-20 ml-16 text-black bg-cyan-400 "
                sx={{
                    
                    '&:hover':{
                        opacity:'0.7',
                        backgroundColor:'#00c6e6',
                    }
                }}
            >
                ADD
            </Button>

        </Grid2>

    );
}
export default UserForm;
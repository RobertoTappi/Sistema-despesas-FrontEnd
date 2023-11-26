import React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Grid, IconButton } from '@mui/material';
import EditarConta from './modaleditarconta';

const ListItemContas = ({ accountsData }) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <AccountBoxIcon style={{ marginTop: '20px', marginLeft: '5px' }} />

                <ListItemText
                    style={{ marginLeft: '22px', marginTop: '20px' }}
                    primary={accountsData.name}
                />

                <Grid>
                    <IconButton edge="end" aria-label="edit">
                        <EditarConta accountsData={accountsData} />
                    </IconButton>
                </Grid>

            </ListItem >
            <Divider variant="inset" component="li" />
        </>
    );
};

export default ListItemContas;

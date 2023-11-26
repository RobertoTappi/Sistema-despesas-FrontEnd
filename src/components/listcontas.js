import React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from '@mui/material/Typography';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton } from '@mui/material';
import EditarConta from './modaleditarconta';

const ListItemContas = ({ accountsData }) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <AccountBoxIcon style={{ marginTop: '15px' }} />

                <ListItemText
                    style={{ marginLeft: '25px' }}
                    primary={accountsData.name}
                    secondary={

                        <Typography
                            component="span"
                            variant="body2"
                            sx={{ display: 'block' }}>
                            {accountsData.id}
                        </Typography>
                    }
                />

                <Grid>
                    <IconButton edge="end" aria-label="edit">
                        <EditarConta />
                    </IconButton>

                    <IconButton edge="end" aria-label="delete" style={{ marginLeft: '15px' }}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>

            </ListItem >
            <Divider variant="inset" component="li" />
        </>
    );
};

export default ListItemContas;

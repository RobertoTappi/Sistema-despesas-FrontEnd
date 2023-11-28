import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, Stack, Grid, IconButton, Tooltip, TextField, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';



const iconStyle = {
    display: 'flex',
    margin: '20px auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7d7d7',
    borderRadius: '50%',
    minWidth: '100px',
    minHeight: '100px',
    border: '2px solid black'
}

const btnStyle = {
    display: 'flex',
    marginTop: '40px',
    gap: '40px',
    justifyContent: 'center'
}

const EditarCategoria = ({ categorysData, open, onClose }) => {
    const [openModal, setOpenModal] = useState(false)

    console.log(categorysData)
    const idCategoria = categorysData
    const token = localStorage.getItem('user');

    useEffect(() => {
        setOpenModal(open);
    }, [open]);

    const closeDialog = () => {
        onClose()
    }

    const handleChangeName = (event) => {

    }

    return (
        <div>
            <Dialog open={openModal} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogContent>
                    <Stack spacing={2}>
                        <Button style={iconStyle}>
                            <Tooltip title="Editar imagem">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Button>
                        <Grid>
                            <h3 style={{ maxHeight: '30px' }}>
                                Nome da categoria: {' '}
                                <input
                                    style={{ minHeight: '27px', fontSize: '18px', minWidth: '65%' }}
                                    variant="outlined"
                                />
                            </h3>
                        </Grid>

                        <Divider sx={{ my: 1 }} />

                        <h3 style={{ maxHeight: '30px' }}>
                            Icone da categoria

                        </h3>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditarCategoria;
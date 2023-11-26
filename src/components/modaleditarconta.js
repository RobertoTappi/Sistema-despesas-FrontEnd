import React, { useState } from 'react';
import { Button, Dialog, DialogContent, TextField, Stack, Grid } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const iconStyle = {
    display: 'flex',
    margin: '40px auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7d7d7',
    borderRadius: '50%',
    minHeight: '100px',
    maxWidth: '100px',
    border: '2px solid black'
}

const btnStyle = {
    display: 'flex',
    marginTop: '40px',
    gap: '40px',
    justifyContent: 'center'
}

const EditarConta = ({ accountsData }) => {
    const [open, setOpen] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editedName, setEditedName] = useState(accountsData.name)

    const openDialog = () => {
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
        setEditing(false)
    }

    const handleEdit = () => {
        setEditing(true);
    }

    const handleCancelEdit = () => {
        setEditing(false)
    }

    const handleChangeName = (event) => {
        setEditedName(event.target.value)
    }

    const handleSave = () => {
        setEditing(false)
    };

    return (
        <div>
            <Button onClick={openDialog}>
                <SettingsIcon />
            </Button>

            <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogContent>
                    <Grid style={iconStyle}>
                        <AccountBoxIcon style={{ minWidth: '80px', minHeight: '80px' }} />
                    </Grid>
                    <Stack spacing={2}>
                        <h3 style={{ maxHeight: '30px' }}>
                            Nome da conta:{' '}
                            {editing ? (
                                <input
                                    style={{ minHeight: '27px', fontSize: '18px' }}
                                    value={editedName}
                                    onChange={handleChangeName}
                                    variant="outlined"
                                />
                            ) : (
                                <span style={{ fontWeight: 'normal' }}>{editedName}</span>
                            )}
                        </h3>

                        <h3 style={{ marginTop: '25px' }}>Saldo: </h3>
                    </Stack>

                    <Grid style={btnStyle}>
                        {editing ? (
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                style={{ backgroundColor: 'green' }}>
                                Salvar
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleEdit}>
                                Editar conta
                            </Button>
                        )}

                        {!editing ? (
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#f44336', marginLeft: '10px' }}
                            >
                                Excluir conta
                            </Button>
                        ) : (
                            <Button
                                variant='contained'
                                onClick={handleCancelEdit}
                                style={{ backgroundColor: '#d3a625' }}
                            >
                                Cancelar
                            </Button>
                        )}

                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
};


export default EditarConta;

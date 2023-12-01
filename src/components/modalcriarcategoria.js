import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, Stack, Grid, Divider, IconButton } from '@mui/material';
import { mapeamentoDeIconesDespesa } from '../util/mapCategorias';
import IconeComponent from '../util/mapCategorias';
import { ArrowBack } from '@mui/icons-material';

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

const newIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const btnStyle = {
    width: '80%',
    margin: '0 auto'
}

const buttonGridStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px'
}

const CriarCategoria = ({ open, handleIconChange, addCategoria }) => {
    const [openModal, setOpenModal] = useState(false)
    const [editedName, setEditedName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState(null)


    useEffect(() => {
        setOpenModal(open);
    }, [open])

    const openDialog = () => {
        setOpenModal(true)
    }

    const closeDialog = () => {
        setOpenModal(false);
        setEditedName('');
        setSelectedIcon(null);
    };

    const handleChangeName = (event) => {
        setEditedName(event.target.value)
    }

    const handleIconClick = (iconId) => {
        handleIconChange(iconId)
        setSelectedIcon(iconId)
    }

    const handleCancel = () => {
        closeDialog()
    }

    const handleSave = () => { 
        addCategoria(editedName)
        closeDialog()
    }

    const renderSelectedIcon = () => {
        if (selectedIcon !== null) {
            const iconeEncontrado = mapeamentoDeIconesDespesa.find((icone) => icone.id === selectedIcon);

            if (iconeEncontrado) {

                return (
                    <div style={{ fontSize: '1px' }}>
                        {iconeEncontrado.icone}
                    </div>
                );
            }
        }

        return null;
    }

    return (
        <div>
            <div>
                <Grid style={buttonGridStyle}>
                    <Button variant="contained" color="success" style={btnStyle} onClick={openDialog}>
                        Adicionar categoria
                    </Button>
                </Grid>
            </div>
            <Dialog open={openModal} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogContent>
                    <Stack spacing={2}>
                        <IconButton onClick={handleCancel} style={{ position: 'absolute', top: 0, left: 0, color: '#000' }}>
                            <ArrowBack />
                        </IconButton>
                        <Grid style={iconStyle}>
                            {selectedIcon !== null && <div style={newIconStyle}>{renderSelectedIcon()}</div>}
                        </Grid>
                        <Grid>
                            <h3 style={{ maxHeight: '30px' }}>
                                Nome da categoria: {' '}
                                <input style={{ minHeight: '27px', fontSize: '18px', minWidth: '65%' }} variant="outlined" value={editedName} onChange={handleChangeName} />
                            </h3>
                        </Grid>

                        <Divider sx={{ my: 1 }} />

                        <h3 style={{ maxHeight: '30px' }}>Ícone da categoria</h3>

                        <Grid container spacing={2} style={{ marginTop: '10px', justifyContent: 'center' }}>
                            {mapeamentoDeIconesDespesa.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <Grid item>
                                        <IconeComponent iconId={item.id} onClick={handleIconClick} />
                                    </Grid>
                                    {(index + 1) % 7 === 0 && <Grid item xs={12} />}
                                </React.Fragment>
                            ))}
                            <Button color="primary" variant="contained" onClick={handleSave}>
                                Criar categoria
                            </Button>
                        </Grid>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CriarCategoria;
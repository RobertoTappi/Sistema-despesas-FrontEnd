import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, Stack, Grid, TextField, Divider } from '@mui/material';
import { mapeamentoDeIconesDespesa } from '../util/mapCategorias';
import IconeComponent from '../util/mapCategorias';

const btnStyle = {
    width: '80%',
    margin: '0 auto'
}

const buttonGridStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px'
}

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

const CriarCategoria = ({ categorysData, open, onClose, handleActualName }) => {
    const [openModal, setOpenModal] = useState(false)
    const [editedName, setEditedName] = useState(categorysData)
    const [actualName, setActualName] = useState(categorysData)
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [actualIcon, setActualIcon] = useState(selectedIcon)

    const idCategoria = categorysData;
    console.log(categorysData)
    const token = localStorage.getItem('user')

    useEffect(() => {
        setOpenModal(open);
    }, [open])

    const openDialog = () => {
        setOpenModal(true)
    }

    const closeDialog = () => {
        onClose();
    }

    const handleChangeName = (event) => {
        setEditedName(event.target.value)
    }

    const handleIconClick = (iconId) => {
        setSelectedIcon(iconId)
    }

    const handleSave = () => {
        setOpenModal(false)
        handleActualName(actualName)
    }

    const handleCancel = () => {
        setOpenModal(false)
    }

    const renderSelectedIcon = () => {
        if (selectedIcon !== null) {
            const iconeEncontrado = mapeamentoDeIconesDespesa.find((icone) => icone.id === selectedIcon);

            if (iconeEncontrado) {
                return (
                    <div style={{ fontSize: '1px' }}>
                        {iconeEncontrado.icone}
                    </div>
                )
            }
        }

        return null;
    }

    return (
        <div>
            <Grid style={buttonGridStyle}>
                <Button variant="contained" color="success" style={btnStyle} onClick={openDialog}>
                    Adicionar conta
                </Button>
            </Grid>
            <Dialog open={openModal} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogContent>
                    <Stack spacing={2}>
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

                        <h3 style={{ maxHeight: '30px' }}>Icone da categoria</h3>

                        <Grid container spacing={2} style={{ marginTop: '10px', justifyContent: 'center' }}>
                            {mapeamentoDeIconesDespesa.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <Grid item>
                                        <IconeComponent iconId={item.id} onClick={handleIconClick} />
                                    </Grid>
                                    {(index + 1) % 7 === 0 && <Grid item xs={12} />}
                                </React.Fragment>
                            ))}
                            <Button variant="contained" style={{ backgroundColor: 'green', minWidth: '150px' }} onClick={handleSave}>Editar conta</Button>
                            <Button variant="contained" style={{ backgroundColor: '#f44336', marginLeft: '30px', minWidth: '150px' }} onClick={handleCancel}>Cancelar</Button>
                        </Grid>
                        <Button color="primary" variant="contained">
                            Criar categoria
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CriarCategoria;
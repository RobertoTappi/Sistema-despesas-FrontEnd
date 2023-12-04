import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, Stack, Grid, Divider, IconButton, TextField } from '@mui/material';
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

const inputStyle = {
    display: 'flex',
    alignItens: "center",
    flexDirection: 'row'
}

const newIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const EditarCategoria = ({ open, onClose, handleActualName, handleIconChange, deletarCategoria, editarCategoria, atualizarNavegador, actualName, actualIcon }) => {
    const [openModal, setOpenModal] = useState(false)
    const [editedName, setEditedName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState(null)


    useEffect(() => {
        setOpenModal(open)
        setEditedName(actualName)
        setSelectedIcon(actualIcon)
    }, [open])

    const closeDialog = () => {
        onClose();
    }

    const handleChangeName = (event) => {
        setEditedName(event.target.value)
    }

    const handleIconClick = (iconId) => {
        setSelectedIcon(iconId)
        handleIconChange(iconId)
    }

    const handleSave = () => {
        if (validarForm()) {
            handleIconChange(selectedIcon)
            editarCategoria(editedName, selectedIcon)
            setMsgAjudaNomeCat('')
            setErrorNomeCat(false)
            onClose()
        }
    }


    const handleCancel = () => {
        onClose()
    }

    const handleExcluir = () => {
        deletarCategoria()
        onClose()
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

    const [msgAjudaNomeCat, setMsgAjudaNomeCat] = useState('')
    const [errorNomeCat, setErrorNomeCat] = useState(false)

    const validarForm = () => {
        if (editedName === '') {
            setErrorNomeCat(true);
            setMsgAjudaNomeCat("Insira um nome válido");
        } else {
            setErrorNomeCat(false);
            setMsgAjudaNomeCat('');
            return true;
        }
    };

    return (
        <div>
            <Dialog open={openModal} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogContent>
                    <Stack spacing={2}>
                        <IconButton onClick={handleCancel} style={{ position: 'absolute', top: 0, left: 0, color: '#000' }}>
                            <ArrowBack />
                        </IconButton>
                        <Grid style={iconStyle}>
                            {selectedIcon !== null && <div style={newIconStyle}>{renderSelectedIcon()}</div>}
                        </Grid>
                        <Grid style={inputStyle}>
                            <TextField
                                label="Nome da Categoria"
                                size="small"
                                style={{ marginBottom: '5px', fontSize: '18px', minWidth: '60%' }}
                                variant="outlined"
                                value={editedName}
                                fullWidth
                                onChange={handleChangeName}
                                error={errorNomeCat}
                                helperText={msgAjudaNomeCat}
                            />
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
                            <Button variant="contained" style={{ backgroundColor: 'green', minWidth: '150px' }} onClick={handleSave}>Editar categoria</Button>
                            <Button variant="contained" style={{ backgroundColor: '#f44336', marginLeft: '30px', minWidth: '150px' }} onClick={handleExcluir}>Excluir</Button>
                        </Grid>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditarCategoria;
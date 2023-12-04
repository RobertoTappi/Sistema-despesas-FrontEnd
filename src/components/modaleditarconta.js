import React, { useState } from 'react';
import { Button, Dialog, DialogContent, Stack, Grid, Typography, TextField } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useEffect } from 'react';
import { DeletarContaAXIOS } from '../services/deletarConta';
import { useRef } from 'react';
import { EditarContaAXIOS } from '../services/editarConta';

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


const EditarConta = ({ accountsData, open, onClose, saldo, handleActualName, removerTransacao }) => {
    const [openModal, setOpenModal] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editedName, setEditedName] = useState(accountsData.name)
    const [actualName, setActualName] = useState(accountsData.name)

    const idAccount = accountsData.id
    const token = localStorage.getItem('user');

    useEffect(() => {
        setOpenModal(open);
    }, [open]);

    const closeDialog = () => {
        onClose()
        setEditing(false)
        setEditedName(actualName)
        setErrorNomeAcc(false);
        setMsgAjudaNomeAcc('')
    }

    const handleEdit = () => {
        setEditing(true);
    }

    const handleCancelEdit = () => {
        setEditedName(actualName)
        setEditing(false)
        setErrorNomeAcc(false);
        setMsgAjudaNomeAcc('');
    }

    const handleChangeName = (event) => {
        setEditedName(event.target.value)
        setErrorNomeAcc(false);
        setMsgAjudaNomeAcc('');
    }

    const handleSave = () => {
        if (validarForm()) {
            setActualName(editedName);
            setEditing(false);
            handleActualName(editedName);
            editarConta()
            onClose()
        } else {
            setErrorNomeAcc(true);
        }
    };

    const handleSaldoStyle = () => {
        return saldo < 0 ? { color: 'red' } : { color: 'green' };
    }

    const formatarSaldo = (saldo) => {
        const saldoFormatado = saldo.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return ` ${saldoFormatado}`;
    };

    async function deletarConta() {
        try {
            const response = await DeletarContaAXIOS(idAccount, token);
            removerTransacao(idAccount)
            closeDialog()

        } catch (error) {
            console.error("erro ao excluir a conta");
        }
    }

    const [msgAjudaNomeAcc, setMsgAjudaNomeAcc] = useState('')
    const [errorNomeAcc, setErrorNomeAcc] = useState(false)

    const validarForm = () => {
        if (editedName === '') {
            setErrorNomeAcc(true);
            setMsgAjudaNomeAcc("Insira um nome válido");
        } else {
            setErrorNomeAcc(false);
            setMsgAjudaNomeAcc('');
            return true;
        }
    };

    async function editarConta() {
        try {
            const response = await EditarContaAXIOS(idAccount, editedName, token)

        } catch (error) {
            console.error("erro ao obter o saldo");
        }
    }

    return (
        <div>
            <Dialog open={openModal} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogContent>
                    <Grid style={iconStyle}>
                        <AccountBoxIcon style={{ minWidth: '80px', minHeight: '80px' }} />
                    </Grid>
                    <Stack spacing={2}>
                        <h3 style={{ alignItems: 'center', maxHeight: '30px' }}>
                            Nome da conta:{' '}
                            {editing ? (
                                <TextField
                                    size="small"
                                    style={{ minWidth: '60%' }}
                                    variant="outlined"
                                    value={editedName}
                                    onChange={handleChangeName}
                                    error={errorNomeAcc}
                                    helperText={msgAjudaNomeAcc}
                                />
                            ) : (
                                <span style={{ fontWeight: 'normal' }}>{editedName}</span>
                            )}
                        </h3>

                        <h3 style={{ marginTop: '25px' }}>Saldo:
                            <span style={{ fontWeight: 'bold', ...handleSaldoStyle() }}>
                                {formatarSaldo(saldo)}
                            </span>
                        </h3>
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
                                onClick={deletarConta}
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

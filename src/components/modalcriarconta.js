import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogContent, Stack, Grid, TextField } from '@mui/material';
import { AdicionarContaAXIOS } from '../services/cadastrarConta';

const buttonGridStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px'
}

const btnStyle = {
    width: '80%',
    margin: '0 auto'
}


const CriarConta = ({ addAccount }) => {
    const [openModal, setOpenModal] = useState(false)
    const [name, setName] = useState('')

    const [msgErro, setMsgErro] = useState('')
    const [errorDesc, setErrorDesc] = useState(false)
    const nomeRef = useRef(null);

    const idUser = localStorage.getItem('userId')
    const token = localStorage.getItem('user');

    const openDialog = () => {
        setOpenModal(true)
    }

    const closeDialog = () => {
        setOpenModal(false)
        setErrorDesc(false)
        setMsgErro('')
        setName('')
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    async function AdicionarConta() {
        try {
            const response = await AdicionarContaAXIOS(name, idUser, token);
            addAccount(response.data)
        } catch (error) {
            console.error("erro ao obter o saldo");
        }
    }

    const validarForm = () => {
        if (name.length === 0) {
            setErrorDesc(true)
            setMsgErro("Preencha o campo")
            nomeRef.current.focus()
        } else {
            setMsgErro("")
            setErrorDesc(false)
            return true
        }
    }

    const handleCreation = () => {
        if(validarForm()) {
            AdicionarConta()
            closeDialog()
        }
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
                    <Stack spacing={4} margin={2}>
                        <h2 align={'center'}>Nova conta</h2>

                        <TextField
                            variant='outlined'
                            type='text'
                            label='Nome da conta'
                            value={name}
                            onChange={handleName}
                            inputRef={nomeRef}
                            error={errorDesc}
                            helperText={msgErro}
                        />

                        <Button color="primary" variant="contained" onClick={handleCreation}>
                            Criar conta
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>

        </div>
    );
};


export default CriarConta;
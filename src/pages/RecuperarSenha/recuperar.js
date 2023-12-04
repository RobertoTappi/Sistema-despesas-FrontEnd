import React, { useState, useRef } from 'react'
import MailLockIcon from '@mui/icons-material/MailLock';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import { validarEmail } from '../../util/functionsUtils.js'
import { enviarEmailFunction } from '../../services/enviarEmail.js';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function notify(msg, abc) {
    if (abc) {
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    } else {
        toast.success(msg, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}



const Recuperar = () => {
    const textFieldRef = useRef(null);
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setEmailErrorText] = useState('');
    const [mostrarCircular, setMostrarCircular] = useState(false);


    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = () => {
        if (validateForm()) {
            enviarEmail()
            setErrorEmail(false)
        }

    }

    const validateForm = () => {

        var result = validarEmail(email);

        if (!result) {
            setErrorEmail(true);
            setEmailErrorText('Email inválido!')
        } else {
            setErrorEmail(false);
            setEmailErrorText('')
            return true
        }
    }

    async function enviarEmail() {
        setMostrarCircular(true);

        const response = await enviarEmailFunction(email);

        if (response.status === 200) {
            notify("Email enviado com sucesso", false)
            setTimeout(() => {
                window.location.href = '/';
            }, 3200);


        } else if (response.status === 400) {
            notify(response.data.mensagem, true)
            setMostrarCircular(false);
            textFieldRef.current.focus();
        }

    }


    const paperStyle = { padding: 20, minHeight: '65vh', width: 400, margin: '20px auto' }
    const avatarStyle = { backgroundColor: 'green', height: 100, width: 100 }
    const iconStyle = { height: 70, width: 70 }
    const buttonStyle = { height: 50 }


    return (
        <Grid>
            <ToastContainer />
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' marginTop={10}>
                    <Avatar style={avatarStyle}><MailLockIcon style={iconStyle}></MailLockIcon></Avatar>
                    <h2>Recuperar senha</h2>
                </Grid>
                <Grid>
                    <TextField
                        inputRef={textFieldRef}
                        label='Email'
                        placeholder='Digite seu email'
                        fullWidth required
                        value={email}
                        onChange={handleEmailChange}
                        error={errorEmail}
                        helperText={errorEmailText}
                    >
                    </TextField>
                </Grid>
                <Grid marginTop={4}>
                    <Button variant="contained" type='submit' color='primary' fullWidth style={buttonStyle} onClick={handleSubmit}>Recuperar senha</Button>
                    <Typography style={{ marginTop: '15px' }}>
                        <Link href="/">
                            Voltar para tela de login
                        </Link>
                    </Typography>
                </Grid>
                <Grid style={{ marginTop: '50px' }}>
                    {mostrarCircular && (
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Recuperar;
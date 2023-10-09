import React, { useState } from 'react'
import { Avatar, Grid, Paper, TextField, Typography, Link, FormHelperText } from '@mui/material';
import { validarEmail } from '../../util/functionsUtils.js'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


// Estilos
const displayFlex = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '98vh' }

const paperStyle = { padding: '20px', minHeight: '65vh', width: '600px', margin: '20px auto', borderRadius: '10px' }

const avatarListStyle = { backgroundColor: 'green', height: '100px', width: '100px' }

const iconListStyle = { height: '70px', width: '70px' }

const buttonStyle = { height: '50px' }


// JS
const Cadastro = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setEmailErrorText] = useState('');

    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordText, setPasswordErrorText] = useState('');

    // Password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Validações
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        
        const result = validarEmail(email);

        if(!result) {
            setErrorEmail(true);
            setEmailErrorText('E-mail invalido!');
        } else {
            setErrorEmail(false);
            setEmailErrorText(false);
        }  
        
    }


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

        if (password.length < 7) {
            setErrorPassword(true);
            setPasswordErrorText('Senha fraca! Menos de 8 caracteres')
        } else {
            setErrorPassword(false);
            setPasswordErrorText(false)
        }
    }

    return (
        <Grid style={displayFlex}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' marginTop='10px'>
                    <Avatar style={avatarListStyle}>
                        <AppRegistrationIcon style={iconListStyle}></AppRegistrationIcon>
                    </Avatar>
                    <h1>Cadastrar conta</h1>
                </Grid>

                <Grid marginTop='35px'>
                    <TextField
                        type='text'
                        label='Nome completo:'
                        placeholder='Insira seu nome'
                        fullWidth required
                    >
                    </TextField>
                </Grid>

                <Grid marginTop='35px'>
                    <TextField
                        type='text'
                        label='E-mail:'
                        placeholder='Insira seu e-mail'
                        value={email}
                        onChange={handleEmailChange}
                        error={errorEmail}
                        helperText={errorEmailText}
                        fullWidth required>
                    </TextField>
                </Grid>

                <Grid marginTop='35px'>
                    <FormControl fullWidth required variant="outlined">
                        <InputLabel
                            htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            error={errorPassword}
                            helperText={errorPasswordText}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password" />
                    </FormControl>
                    <FormHelperText error={errorPassword}>
                    {errorPasswordText}
                    </FormHelperText>
                </Grid>

                <Grid marginTop='40px'>
                    <Button variant="contained" type='submit' color='primary' fullWidth style={buttonStyle}>CADASTRAR</Button>
                </Grid>

                <Grid marginTop='10px'>
                    <Typography>Já possui cadastro?
                        <Link href="/" marginLeft='5px'>
                            Clique aqui!
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Cadastro;
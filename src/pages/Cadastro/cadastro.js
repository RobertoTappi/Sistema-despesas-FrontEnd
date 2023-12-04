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
import PasswordStrenghMeter, { num } from '../../util/PasswordStrenghMeter.js';
import { RegisterAXIOS } from '../../services/cadastroService.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function notify(msg, abc) {
    if (abc) {
        toast.error(msg, {
            position: "top-right",
            autoClose: 1000,
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



// Estilos
const displayFlex = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '98vh' }

const paperStyle = { padding: '20px', minHeight: '65vh', width: '600px', margin: '20px auto', borderRadius: '10px' }

const avatarListStyle = { backgroundColor: 'green', height: '100px', width: '100px' }

const iconListStyle = { height: '70px', width: '70px' }

const buttonStyle = { height: '50px' }

const passwordBar = { backgroundColor: 'black', borderRadius: '10px' }

// JS
const Cadastro = () => {

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorName, setErrorName] = useState(false)
    const [errorNameText, setNameErrorText] = useState('');

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

    const navigate = useNavigate()

    // Validações
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const validateForm = () => {

        const result = validarEmail(email);

        if (name.length <= 3) {
            setErrorName(true);
            setNameErrorText('Insira um nome maior!');
        } else if (!result){
            setErrorEmail(true);
            setEmailErrorText('E-mail invalido!');
            setErrorName(false);
            setNameErrorText(false);
        } else if (password.length <= 8) {
            setErrorPassword(true);
            setPasswordErrorText('Senha deve ser OK!')
            setErrorEmail(false);
            setEmailErrorText(false);
        } else {
            setErrorPassword(false);
            setPasswordErrorText(false)
            return true
        }

    }

    const handleRegister = () => {
        if (validateForm()) {
            register()
        } else {
            return
        }
    }

    async function register() {
        const response = await RegisterAXIOS(email, password, name)

        if (response.status === 200) {
            notify("Cadastro realizado com sucesso", false)

            const token = response.data.token;
            localStorage.setItem('user', token)

            const idUser = response.data.id
            localStorage.setItem('userId', idUser)

            setTimeout(() => {
                navigate('/home')
            }, "2100");

        } else if (response.status === 400) {
            notify(response.data.mensagem, true)
        }
    }

    return (
        <Grid style={displayFlex}>
            <ToastContainer />

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
                        value={name}
                        onChange={handleNameChange}
                        error={errorName}
                        helperText={errorNameText}
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
                        <PasswordStrenghMeter
                            password={password}
                            style={passwordBar} />
                        {errorPasswordText}
                    </FormHelperText>

                </Grid>

                <Grid marginTop='20px'>
                    <Button
                        variant="contained"
                        type='submit'
                        color='primary'
                        fullWidth
                        style={buttonStyle}
                        onClick={handleRegister}
                    >CADASTRAR</Button>
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
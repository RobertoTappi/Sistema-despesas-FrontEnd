import React, { useState, useRef, useEffect } from 'react'
import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Button from '@mui/material/Button';
import { validarEmail, getCookie } from '../../util/functionsUtils.js'
import { LoginAXIOS } from '../../services/loginService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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

const Login = () => {
    const token = localStorage.getItem('user');
    const navigate = useNavigate()
    const textFieldPasswordRef = useRef(null);
    const textFieldEmailRef = useRef(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [email, setEmail] = useState(getCookie('myusrname'));
    const [password, setPassword] = useState(getCookie('mypswd'));
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordText, setPasswordErrorText] = useState('');
    const [mostrarCircular, setMostrarCircular] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setEmailErrorText] = useState('');

    const [checked, setChecked] = useState(false);
    const [isValidToken, setIsValidToken] = useState(null);
    //Estilizacao
    const paperStyle = { padding: 20, minHeight: '65vh', width: 400, margin: '20px auto' }
    const avatarStyle = { backgroundColor: 'green', height: 100, width: 100 }
    const iconStyle = { height: 70, width: 70 }
    const buttonStyle = { height: 50 }
    const typographyStyle = { marginTop: '20px' }

    // Password
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const validarFormulario = () => {

        const result = validarEmail(email)

        const senhaValida = password.length < 4;


        if (!result) {
            setErrorEmail(true);
            setEmailErrorText('Email invalido!')
            textFieldEmailRef.current.focus();

        } else if (senhaValida) {
            setErrorPassword(true);
            setPasswordErrorText('Senha inválida, menos de 4 caracteres!')
            setErrorEmail(false);
            setEmailErrorText('')
            textFieldPasswordRef.current.focus();

        } else {
            setErrorEmail(false);
            setEmailErrorText('')
            setErrorPassword(false);
            setPasswordErrorText('')
            return true;
        }
    }

     const handleLogin = async () => {

        if (validarFormulario()) {
             await logar()
        } else {
            notify("Preencha corretamente email/senha", true)
        }
    }

    async function logar() {
        const response = await LoginAXIOS(email, password);
        if (response.status === 200) {
            notify("Login realizado com sucesso", false)
            setCookie();
            const token = response.data.token;
            localStorage.setItem("user", token)
            const idUser = response.data.id;
            localStorage.setItem("userId", idUser)
            setTimeout(() => {
                navigate('/home')
            }, "1200");
            setMostrarCircular(true);
        } else if (response.status === 400) {
            if (response.status === 'Email não cadastrado no sistema!') {
                notify(response.data.mensagem, true)
                textFieldEmailRef.current.focus();
            }
            else if (response.data.erro === 'Bad credentials') {
                notify('Senha errada, por favor digite novamente!', true)
                textFieldPasswordRef.current.focus();
            } else {
                notify(response.data.mensagem, true)
            }
        }

    }


    const setCookie = () => {
        if (checked) {
            document.cookie = "myusrname=" + email + ";path=https://coincontrol-387d4.web.app/";
            document.cookie = "mypswd=" + password + ";path=https://coincontrol-387d4.web.app/";
        }
    }


    const handleChangeCheckBox = (event) => {
        setChecked(event.target.checked)
    }
    const handleTextEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleTextPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                await axios.post("https://deploy-backendcoincontrol.onrender.com/api/user/validIsToken", { token });
                setIsValidToken(true);
            } catch (error) {
                setIsValidToken(false);
            }
        };
        checkTokenValidity();
    }, [token]);

    if (isValidToken === false) {
        return (<Grid>
            <ToastContainer />
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' marginTop={10}>
                    <Avatar style={avatarStyle}><LockOutlinedIcon style={iconStyle}></LockOutlinedIcon></Avatar>
                    <h3>Acesse sua conta</h3>
                </Grid>

                <Grid>
                    <TextField
                        inputRef={textFieldEmailRef}
                        label='Email'
                        placeholder='Digite seu email'
                        fullWidth required
                        value={email}
                        onChange={handleTextEmailChange}
                        error={errorEmail}
                        helperText={errorEmailText}>
                    </TextField>
                </Grid>

                <Grid marginTop={4}>
                    <FormControl fullWidth required variant="outlined">

                        <InputLabel
                            htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            inputRef={textFieldPasswordRef}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            error={errorPassword}
                            onChange={handleTextPasswordChange}
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
                </Grid>

                <Grid marginTop={2}>
                    <FormControlLabel
                        control={
                            <Checkbox name="checkedB" color='primary' checked={checked} onChange={handleChangeCheckBox}></Checkbox>
                        } label="Lembrar senha">
                    </FormControlLabel>
                </Grid>
                <Grid marginTop={2}>
                    <Button variant="contained" type='submit' color='primary' fullWidth style={buttonStyle} onClick={handleLogin}>Acessar</Button>
                </Grid>

                <Grid>
                    <Typography style={{marginTop: '5px'}}>
                        <Link href="/RecuperarSenha">
                            Esqueci minha senha
                        </Link>
                    </Typography>
                    <Typography style={typographyStyle}> Ainda não possui conta? {' '}
                        <Link href="/cadastro">
                            Faça o cadastro!
                        </Link>
                    </Typography>
                </Grid>
                <Grid>
                    {mostrarCircular && (
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </Grid>
            </Paper>
        </Grid>
        )
    } else if (isValidToken) {
        window.location.href = '/home';
    }
}

export default Login
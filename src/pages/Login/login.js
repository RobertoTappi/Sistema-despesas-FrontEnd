import React, {useState} from 'react'
import {Grid,Paper,Avatar, TextField,FormControlLabel, Checkbox, Typography,Link} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Button from '@mui/material/Button';
import {validarEmail} from '../../util/functionsUtils.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notify = () =>{
    toast.error('🦄 Email/Senha invalida!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}


const Login = () =>{
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordText, setPasswordErrorText] = useState('');

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setEmailErrorText] = useState('');


    //Estilizacao
    const paperStyle={padding:20, minHeight:'65vh',width:400,margin:'20px auto'}
    const avatarStyle={backgroundColor:'green',height:100,width:100}
    const iconStyle={height:70,width:70}
    const buttonStyle={height:50}
    const typographyStyle={margin: '10px 0px'}
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const result = validarEmail(email);

        if(!result){
            setErrorEmail(true);
            setEmailErrorText('Email invalido!')
        }else{
            setErrorEmail(false);
            setEmailErrorText(false)
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

        if((password.length < 7)){
            setErrorPassword(true);
            setPasswordErrorText('Senha fraca menos de 8 caracteres')
        }else{
            setErrorPassword(false);
            setPasswordErrorText(false)
        }
    }

    const validarFormulario = () =>{
        var emailValido = validarEmail(email)
        var senhaValida = password.length >= 8;
        var formularioValido = emailValido && senhaValida;
        setIsButtonDisabled(!formularioValido);
        debugger
        return formularioValido;
    }

    const handleLogin = () =>{
        if(validarFormulario()){
            console.log('Email e senha valido,relizando o login')
        }else{
            console.log('error')
            notify()
        }
    }

    return(
        <Grid>
            <ToastContainer/>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'marginTop={10}>
                    <Avatar style={avatarStyle}><LockOutlinedIcon style={iconStyle}></LockOutlinedIcon></Avatar>
                    <h3>Acesse sua conta</h3>
                </Grid>

                <Grid>
                    <TextField
                        label='Email's
                        placeholder='Digite seu email'
                        fullWidth required
                        value={email}
                        onChange={handleEmailChange}
                        error={errorEmail}
                        helperText={errorEmailText}>
                    </TextField>
                </Grid>
                <Grid marginTop={4}>
                    <TextField
                        label='Senha'
                        placeholder='Digite sua senha'
                        fullWidth required 
                        type='password' 
                        value={password} 
                        onChange={handlePasswordChange} 
                        error={errorPassword}
                        helperText={errorPasswordText}>
                    </TextField>
                </Grid>
                
                <Grid marginTop={2}>
                    <FormControlLabel
                    control={
                        <Checkbox name="checkedB" color='primary'></Checkbox>
                    } label="Lembrar senha">
                    </FormControlLabel>
                </Grid>
                <Grid marginTop={2}>
                    <Button variant="contained" type='submit' color='primary' fullWidth style={buttonStyle} onClick={handleLogin}disabled={isButtonDisabled}>Acessar</Button>
                </Grid>
                    
                <Grid>
                    <Typography>
                        <Link href="/RecuperarSenha">
                            Esqueci minha senha
                        </Link>
                    </Typography>
                    <Typography style={typographyStyle}> Ainda não possui conta? 
                        <Link href="/cadastro">
                            Faça o cadastro!
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login
import React, {useState} from 'react'
import {Grid,Paper,Avatar, TextField,FormControlLabel, Checkbox, Typography,Link} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Button from '@mui/material/Button';
import {validarEmail , getCookie} from '../../util/functionsUtils.js'
import { LoginAXIOS } from '../../services/loginService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function notify(msg,abc){
    if(abc){
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
    }else{
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

const Login = () =>{


    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [email, setEmail] = useState(getCookie('myusrname'));
    const [password, setPassword] = useState(getCookie('mypswd'));
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordText, setPasswordErrorText] = useState('');
    const [mostrarCircular, setMostrarCircular] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setEmailErrorText] = useState('');
    
    const [checked, setChecked] = useState(false);
    
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
        validarFormulario();
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if(password.length < 7){
            setErrorPassword(true);
            setPasswordErrorText('Senha fraca menos de 8 caracteres')
        }else{
            setErrorPassword(false);
            setPasswordErrorText(false)
        }
        validarFormulario();
    }

    const validarFormulario = () =>{
        var emailValido = validarEmail(email)
        var senhaValida = password.length > 6;
        var formularioValido = emailValido && senhaValida;
        setIsButtonDisabled(!formularioValido);
        return formularioValido;
    }

    const handleLogin = () =>{
        if(validarFormulario()){
            logar()
        }else{
            notify("Preencha corretamente Email/Senha",true)
        }
    }

    async function logar(){
        const response = await LoginAXIOS(email, password);
        console.log(response);
        if(response.status === 200){
            notify("Login realizado com sucesso",false)
            setCookie();
            setMostrarCircular(true);
        }else if(response.status === 400){
            notify(response.data.mensagem,true)
        }

        }
    

    const setCookie = () =>{
        if(checked){
            document.cookie="myusrname="+email+";path=http://localhost:3000/";
            document.cookie="mypswd="+password+";path=http://localhost:3000/";
        }
    }

    setTimeout(validarFormulario,100)
    const handleChangeCheckBox = (event) =>{
        setChecked(event.target.checked)
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
                        <Checkbox name="checkedB" color='primary' checked={checked} onChange={handleChangeCheckBox}></Checkbox>
                    } label="Lembrar senha">
                    </FormControlLabel>
                </Grid>
                <Grid marginTop={2}>
                    <Button variant="contained" type='submit' color='primary' fullWidth style={buttonStyle} onClick={handleLogin}disabled={(errorPassword || errorEmail) || isButtonDisabled}>Acessar</Button>
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
}

export default Login
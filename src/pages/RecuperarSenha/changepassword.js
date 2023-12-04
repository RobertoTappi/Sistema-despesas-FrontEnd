import React,{useState, useRef, useEffect} from 'react'
import {Grid,Paper,Avatar,Button,Typography,Link} from '@mui/material'
import MailLockIcon from '@mui/icons-material/MailLock';
import { useLocation } from 'react-router-dom';
import { FormControl, InputLabel, OutlinedInput} from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import axios from "axios"
import { alterarSenha } from '../../services/loginService';
import { ToastContainer, toast } from 'react-toastify';

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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

const ChangePassword = ()=>{
    const textFieldRef = useRef(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const nome = params.get('username')
    const token = params.get('token')

    const paperStyle={padding:20, minHeight:'65vh',width:600,margin:'20px auto'}
    const avatarStyle={backgroundColor:'green',height:100,width:100}
    const iconStyle={height:70,width:70}
    const buttonStyle={height:50}
    const [okPassword, setokPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordText, setPasswordErrorText] = useState('');
    const [isValidToken, setIsValidToken] = useState(null);

    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (password.length < 7) {
            setErrorPassword(true);
            setPasswordErrorText('Senha fraca menos de 8 caracteres')
        } else {
            setErrorPassword(false);
            setPasswordErrorText(false)
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleLogin = () => {
        if (password.length < 7) {
            setErrorPassword(true);
            setPasswordErrorText('Senha fraca menos de 8 caracteres')
            textFieldRef.current.focus();
        }else{
           AlterarSenhaNaPagina()
        } 
    }

    async function AlterarSenhaNaPagina() {
        const response = await alterarSenha(token, password);
        console.log(response);
        if (response.status === 200) {
            setokPassword(true)
            notify("Senha alterada com sucesso!", false)
            setTimeout(() => {
                window.location.href = '/';
              }, 2500);
        } else if (response.status === 400) {
            notify(response.data.mensagem, true)
        }

    }


    useEffect(() => {
        const checkTokenValidity = async () => {
          try {
            await axios.post("http://localhost:8080/api/user/validIsToken", { token });
            setIsValidToken(true);
          } catch (error) {
            setIsValidToken(false);
          }
        };
    
        checkTokenValidity();
      }, [token]);

      if (isValidToken === null) {
        return <div>Verificando a validade do token...</div>;
      } else if (isValidToken) {
        return (
          <Grid>
            <ToastContainer />
            <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'marginTop={10}>
                        <Avatar style={avatarStyle}><MailLockIcon style={iconStyle}></MailLockIcon></Avatar>
                        <h1>Alterar a senha</h1>
                    </Grid>
                    <Grid>
                        <p><b>Prezado {nome},</b> para alterar a sua senha basta digitar a nova senha</p>
                    </Grid>
    
                    <Grid marginTop={4}>
                       <FormControl fullWidth required variant="outlined">
    
                        <InputLabel
                            htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            inputRef={textFieldRef}
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
                            <p style={{ color: 'red' }}>{errorPasswordText}</p>
                    </FormControl>
                    </Grid>
    
                    <Grid marginTop={4}>
                        <Button variant="contained" type='submit' color='primary' fullWidth style={buttonStyle} onClick={handleLogin} disabled={okPassword}>Alterar senha</Button>
                        <Typography>
                            <Link href="/">
                                Voltar para tela de login
                            </Link>
                        </Typography>
                    </Grid>
                </Paper>
          </Grid>
        );
      } else {
        return <h4>TOKEN EXPIROU. Peça novamente para trocar a senha.</h4>;
      }
};

export default ChangePassword;
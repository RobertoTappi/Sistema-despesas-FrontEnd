import React,{useState} from 'react'
import MailLockIcon from '@mui/icons-material/MailLock';
import {Grid,Paper,Avatar,TextField,Button,Typography,Link} from '@mui/material'
import {validarEmail} from '../../util/functionsUtils.js'



const Recuperar = ()=>{

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setEmailErrorText] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        var result = validarEmail(email);

        if(!result){
            setErrorEmail(true);
            setEmailErrorText('Email invalido!')
        }else{
            setErrorEmail(false);
            setEmailErrorText(false)
        }
    }

    const paperStyle={padding:20, minHeight:'65vh',width:400,margin:'20px auto'}
    const avatarStyle={backgroundColor:'green',height:100,width:100}
    const iconStyle={height:70,width:70}
    const buttonStyle={height:50}


    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'marginTop={10}>
                    <Avatar style={avatarStyle}><MailLockIcon style={iconStyle}></MailLockIcon></Avatar>
                    <h2>Recuperar senha</h2>
                </Grid>
                <Grid>
                    <TextField
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
                    <Button variant="contained" type='submit' color='primary' fullWidth style={buttonStyle} disabled={errorEmail}>Recuperar senha</Button>
                    <Typography>
                        <Link href="/">
                            Voltar para tela de login
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Recuperar;
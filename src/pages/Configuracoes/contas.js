import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppsIcon from '@mui/icons-material/Apps';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import NavBar from '../../components/navbar';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Paper } from '@mui/material';
import ListItemContas from '../../components/listcontas';
import { useState, useEffect } from 'react';
import CriarConta from '../../components/modalcriarconta';
import axios from 'axios';


// Estilos 

const paperStyle = {
    padding: '10px',
    minHeight: '650px',
    maxWidth: '1200px',
    margin: '20px auto',
    borderRadius: '10px'
}

const gridStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const drawerWidth = 240;

function Contas() {
    const navigate = useNavigate()

    const [accountsData, setAccounts] = useState(null)

    const URL = "https://deploy-backendcoincontrol.onrender.com/api/"
    const token = localStorage.getItem('user');
    const idUser = localStorage.getItem('userId')

    useEffect(() => {

        const obterAccounts = async () => {
            try {
                const response = await axios.get(URL + 'account/findAllAccounts/' + idUser, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                setAccounts(response.data);

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        const criarAccount = async () => {
            try {
                const response = await axios.get(URL + 'account/findAllAccounts/' + idUser, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                setAccounts(response.data);

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        obterAccounts()
        criarAccount()
    }, [])

    const addAccount = (account) => {
        setAccounts((prevAccount) => [...prevAccount, account]);
    };

    const removerTransacao = (accountId) => {
        setAccounts((prevAccount) =>
            prevAccount.filter((account) => account.id !== accountId)
        );
    };

    const handlePages = (page) => {
        if (page === 'Contas') {
            navigate('/configuracoes/contas')
        } else if (page === 'Categorias') {
            navigate('/configuracoes/categorias')
        }
    }

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none' }}>
                    <NavBar />
                </AppBar>

                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginTop: '5px' },
                    }}
                >

                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {['Contas', 'Categorias'].map((text, index) => (
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handlePages(text)}>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <SwitchAccountIcon /> : <AppsIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Container>
                        <Paper elevation={5} style={paperStyle}>
                            <div style={gridStyle}>
                                <h2>Suas contas</h2>
                            </div>
                            <Grid style={{ minHeight: '500px' }}>
                                <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                                    {accountsData && accountsData.map((accountsData, index) => (
                                        <ListItemContas index={index} accountsData={accountsData} removerTransacao={removerTransacao} />
                                    ))}
                                </List>
                            </Grid>
                            <CriarConta addAccount={addAccount}></CriarConta>
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </div >
    );
}

export default Contas;

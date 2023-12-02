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
import { Container, Grid, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListItemCategorias from '../../components/listcategorias';
import CriarCategoria from '../../components/modalcriarcategoria';

// Estilos
const paperStyle = {
    padding: '10px',
    minHeight: '650px',
    maxWidth: '1200px',
    margin: '20px auto',
    borderRadius: '10px'
};

const drawerWidth = 240;

function Categorias() {
    const navigate = useNavigate();

    const [categorysData, setCategorysData] = useState([]);
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);

    const URL = "http://localhost:8080/api/";
    const token = localStorage.getItem('user');
    const idUser = localStorage.getItem('userId');

    const [value, setValue] = useState(0);

    useEffect(() => {
        const obterCategorys = async () => {
            try {
                const response = await axios.get(URL + 'category/' + idUser, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                setCategorysData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        obterCategorys();
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlePages = (page) => {
        if (page === 'Contas') {
            navigate('/configuracoes/contas');
        } else if (page === 'Categorias') {
            navigate('/configuracoes/categorias');
        }
    };

    const atualizarNavegador = (categoryId, idCon, nome) => {
        const categoriaEncontrada = categorysData.find(category => category.id === categoryId)
        categoriaEncontrada.idCon = idCon
        categoriaEncontrada.nome = nome

        if (categoriaEncontrada) {
            setCategorysData((prevCategorys) => {
                const index = prevCategorys.findIndex((category) => category.id === categoryId);

                if (index !== -1) {
                    const newCategory = [...prevCategorys];
                    newCategory[index] = categoriaEncontrada;
                    return newCategory;
                }
                return prevCategorys;
            });
        }
    }

    const onRemoverCategoria = (idCategoria) => {
        setCategorysData((prevCategorysData) =>
            prevCategorysData.filter((categoria) => categoria.id !== idCategoria)
        );

    }

    console.log(categorysData)

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
                                <ListItem disablePadding key={text}>
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
                            <Grid align='center'>
                                <h2>Suas categorias</h2>
                            </Grid>

                            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <Tabs value={value} onChange={handleChange} centered>
                                    <Tab label="Receitas" />
                                    <Tab label="Despesas" />
                                </Tabs>
                            </Box>

                            <Grid style={{ minHeight: '500px' }}>
                                {value === 0 && (
                                    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                                        <ListItemCategorias categorysData={categorysData && categorysData.filter(category => category.tipo === "RECEITA")} atualizarNavegador={atualizarNavegador} onRemoverCategoria={onRemoverCategoria} />
                                    </List>
                                )}

                                {value === 1 && (
                                    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                                        <ListItemCategorias categorysData={categorysData && categorysData.filter(category => category.tipo === "DESPESA")} atualizarNavegador={atualizarNavegador} onRemoverCategoria={onRemoverCategoria} />
                                    </List>
                                )}
                            </Grid>
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </div>
    );
}

export default Categorias;

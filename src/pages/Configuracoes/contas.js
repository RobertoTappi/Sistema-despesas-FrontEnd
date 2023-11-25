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
import { Container, Paper } from '@mui/material';

// Estilos 

const paperStyle = {
    padding: '10px',
    minHeight: '250px',
    maxWidth: '1200px',
    margin: '20px auto',
    borderRadius: '10px'
};


const drawerWidth = 240;

function Contas() {

    const navigate = useNavigate()

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

                        </Paper>
                    </Container>

                </Box>
            </Box>
        </div>
    );
}

export default Contas;

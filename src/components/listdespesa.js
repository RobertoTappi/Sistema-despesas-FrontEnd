import React,{useState} from 'react';
import {ListItem,Dialog,Button, DialogContent} from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModalEditTransa from './modaltransacaoedit';


function retornaValor(dados){
    if(dados && dados !=null && dados!=undefined){
        return dados.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
}




const ListItemDespesa = ({ dados, index }) => {

    const [openModal, setOpenModal] = useState(false);

    const handleClickOpen = () => {
      setOpenModal(true);
    };
  
    const handleClose = () => {
      setOpenModal(false);
    };


    return (
        <>
            <ListItem alignItems="flex-start" button onClick={handleClickOpen}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={dados.descricao}
                    secondary={
                        <Box display="flex" justifyContent="space-between">
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                                {dados.creationDate}
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                                { retornaValor(dados.valor)}
                            </Typography>
                        </Box>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ModalEditTransa open={openModal}dados={dados} onClose={handleClose}></ModalEditTransa>
        </>
    );
};

export default ListItemDespesa;

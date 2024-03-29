import React, { useEffect, useState } from 'react';
import { ListItem, Dialog, Button, DialogContent, Icon } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModalEditTransa from './modaltransacaoedit';
import Tooltip from '@mui/material/Tooltip';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconeComponent, { mapeamentoDeIconesDespesa } from '../util/mapCategorias';


function retornaValor(dados) {
  if (dados && dados != null && dados != undefined) {
    return dados.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
}



const ListItemDespesa = ({ dados, index, onAtualizarTrasacao, onRemoverTransacao, isPagaTransacao, categorysData, category }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null)


  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const hadleIsPaga = async () => {
     await isPagaTransacao(dados.id)
  }


  const renderSelectedIcon = () => {
    const categoriaAssociada = categorysData

    if (categoriaAssociada) {
      const iconeEncontrado = mapeamentoDeIconesDespesa.find(icone => icone.id === categoriaAssociada.idCon);

      if (iconeEncontrado) {
        return (
          <div style={{ fontSize: '1px' }}>
            {iconeEncontrado.icone}
          </div>
        );
      }
    }

    return null;
  };

  return (
    <>
      <ToastContainer />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <ListItem button onClick={handleClickOpen}>
          <ListItemAvatar>
            {renderSelectedIcon()}
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
                  sx={{ display: 'inline', marginBottom: '-30px' }}
                  component="span"
                  variant="body2"
                >
                  {retornaValor(dados.valor)}
                </Typography>
              </Box>
            }
          />
        </ListItem>
        <Box>
          <Tooltip title="Marcar como pago" arrow>
            <ThumbDownIcon
              style={{ display: 'inline', fontSize: '28px', marginTop: '25px', color: 'red' }}
              onClick={hadleIsPaga}
            />
          </Tooltip>
        </Box>
      </Box>
      <Divider variant="inset" component="li" />
      <ModalEditTransa
        onRemoverTransacao={onRemoverTransacao}
        open={openModal}
        dados={dados}
        onClose={handleClose}
        onAtualizarTrasacao={onAtualizarTrasacao}
        categorys={category}
      />
    </>
  );
};

export default ListItemDespesa;

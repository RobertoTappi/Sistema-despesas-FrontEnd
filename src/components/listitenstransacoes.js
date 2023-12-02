import React from "react";
import { ListItem, Dialog, Button, DialogContent } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ModalEditTransa from "./modaltransacaoedit";
import Tooltip from '@mui/material/Tooltip';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
function retornaValor(dados) {
  if (dados && dados != null && dados != undefined) {
    return dados.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
}


const ListItensTransacoes = ({dados,categoryName,isPagaTransacao}) => {
    debugger
  const handleClickOpen = () =>{
    
  }
  
  const hadleIsPaga = () =>{
    isPagaTransacao(dados.id,true)
  }

  const hadleIsNotPaga = () =>{
    isPagaTransacao(dados.id,false)
  }
  return (
    <>
      <Box  display="flex"
            justifyContent="space-between"
            alignItems="flex-start">
      <ListItem button onClick={handleClickOpen}
        style={{  alignItems: 'center',maxHeight:'50px',height:'100%',justifyContent: 'space-between',width:"95%" }}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{margin:'5px', height: '100%', width: '400px',  }}>{dados && dados.descricao}</div>
                <div style={{margin:'5px', height: '100%', width: '200px', margin:'auto' }}>{categoryName}</div>
                <div style={{margin:'5px', height: '100%', width: '200px', marginRight: '-10px', }}>{retornaValor(dados.valor)}</div>
            </div>
            </> 
            }
        />
      </ListItem>
      <Box>
        {!dados.isPaga ? (
          <Tooltip title="Marcar como pago" arrow>
            <ThumbDownIcon
              style={{ display: 'inline', fontSize: '28px', marginTop: '25px', marginRight: '20px', color: 'red' }}
              onClick={hadleIsPaga}
            />
          </Tooltip>
        ):(
          <Tooltip title="Marcar como nao pago" arrow>
          <ThumbUpIcon
            style={{ display: 'inline', fontSize: '28px', marginTop: '25px', marginRight: '20px', color: 'green' }}
            onClick={hadleIsNotPaga}
          />
        </Tooltip>

        )}

      </Box>
      </Box>
    </>
  );
};

export default ListItensTransacoes;

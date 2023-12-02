import React from "react";
import { ListItem, Dialog, Button, DialogContent } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ModalEditTransa from "./modaltransacaoedit";

function retornaValor(dados) {
  if (dados && dados != null && dados != undefined) {
    return dados.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
}

const handleClickOpen = () =>{
    
}

const ListItensTransacoes = ({dados,categoryName}) => {
    debugger;
  return (
    <>
      <ListItem button onClick={handleClickOpen}
        style={{ display: 'flex', alignItems: 'center',maxHeight:'50px',height:'100%',justifyContent: 'space-between' }}
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
    </>
  );
};

export default ListItensTransacoes;

import React,{useState} from "react";
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
import IconeComponent, { mapeamentoDeIconesDespesa } from '../util/mapCategorias';

function retornaValor(dados) {
  if (dados && dados != null && dados != undefined) {
    return dados.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
}








const ListItensTransacoes = ({dados,categoryName,isPagaTransacao,categoryList,onRemoverTransacao,onAtualizarTrasacao}) => {


  let styleMonetario;
  if(dados.type === 'RECEITA'){
    styleMonetario = {margin:'5px', height: '100%', width: '200px', marginRight: '-10px',color:'green'}
  }else{
    styleMonetario = {margin:'5px', height: '100%', width: '200px', marginRight: '-10px',color:'red'}
  }

  
  const hadleIsPaga = () =>{
    isPagaTransacao(dados.id,true)
  }

  const hadleIsNotPaga = () =>{
    isPagaTransacao(dados.id,false)
  }

  const renderSelectedIcon = () => {
    const categoriaAssociada = categoryList
    
    if (categoriaAssociada) {
      const relacaoCategoriaEtransacao = categoriaAssociada.find(category => category.id === dados.idCategory);
      if(relacaoCategoriaEtransacao){
        const iconeEncontrado = mapeamentoDeIconesDespesa.find(icone => icone.id === relacaoCategoriaEtransacao.idCon);
        if (iconeEncontrado) {
          return (
            <div style={{ fontSize: '1px' }}>
              {iconeEncontrado.icone}
            </div>
          );
        }
      }
    }
    return null;
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null)


  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  
  return (
    <>
      <Box  display="flex"
            justifyContent="space-between"
            alignItems="flex-start">
      <ListItem button onClick={handleClickOpen}
        style={{  alignItems: 'center',maxHeight:'50px',height:'100%',justifyContent: 'space-between',width:"95%" }}
      >
        <ListItemAvatar>
           {renderSelectedIcon()} 
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{margin:'5px', height: '100%', width: '400px',  }}>{dados && dados.descricao}</div>
                <div style={{margin:'5px', height: '100%', width: '200px', margin:'auto' }}>{categoryName}</div>
                <div style={styleMonetario}>{
                dados.type === 'RECEITA' ? retornaValor(dados.valor) : retornaValor(-dados.valor)
              }</div>
            </div>
            </> 
            }
        />
      </ListItem>
      <Box>
        {!dados.isPaga ? (
          <Tooltip title="Marcar como pago" arrow>
            <ThumbDownIcon
              style={{ display: 'inline', fontSize: '28px', marginTop: '15px', marginRight: '20px', color: 'red' }}
              onClick={hadleIsPaga}
            />
          </Tooltip>
        ):(
          <Tooltip title="Marcar como nao pago" arrow>
          <ThumbUpIcon
            style={{ display: 'inline', fontSize: '28px', marginTop: '15px', marginRight: '20px', color: 'green' }}
            onClick={hadleIsNotPaga}
          />
        </Tooltip>

        )}

      </Box>
      </Box>
      <ModalEditTransa
        onRemoverTransacao={onRemoverTransacao}
        open={openModal}
        dados={dados}
        onClose={handleClose}
        onAtualizarTrasacao={onAtualizarTrasacao}
        categorys={categoryList}
      />
    </>
  );
};

export default ListItensTransacoes;

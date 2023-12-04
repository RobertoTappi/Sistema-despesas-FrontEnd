import { Divider, Typography } from "@mui/material";
import React from "react";
import { Grid } from '@mui/material';
import ListItensTransacoes from "./listitenstransacoes"
const divPaiStyle = {
    marginTop:'3px',
  maxWidth: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderBottom: '1px solid black',
  borderRadius: "0 0 5px 5px",
};

const numeroStyle = {
  maxWidth: '4%',


};

const segundaDivStyle = {
  maxWidth: '100%',

};

const ModalPaiListTransa = ({onAtualizarTrasacao,onRemoverTransacao, day, transactions,accountsData,isPagaTransacao,categoryList }) => {
 
  return (
    <Grid container style={divPaiStyle}>
      <Grid item style={numeroStyle}>
        <Typography variant="h4">{day && day.split("/")[0]}</Typography>
      </Grid>
      <Grid item style={segundaDivStyle}>
        {transactions.map((transaction, index) => (
          <ListItensTransacoes onAtualizarTrasacao={onAtualizarTrasacao} onRemoverTransacao={onRemoverTransacao} categoryList={categoryList} key={index} dados={transaction} categoryName={ accountsData &&(accountsData && accountsData.find(account => account.id === transaction.idAccount)).name} isPagaTransacao={isPagaTransacao}/>
        ))}
      </Grid>
    </Grid>
  );
}

export default ModalPaiListTransa;
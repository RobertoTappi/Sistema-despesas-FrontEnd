import React from 'react'
import { Paper, Grid } from '@mui/material'
import List from '@mui/material/List';
import ListItemDespesa from './listdespesa';

const TransacaoModalDespesa = ({props,onAtualizarTrasacao,onRemoverTransacao,isPagaTransacao}) => {
    const transactionData = props


    const paperStyle = { padding: 20 , minHeight: '25vh', width: 500, borderRadius: '10px' }

    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Contas a pagar</h2>
            </Grid>
            <Grid style={{ width: '100%', maxWidth: '100%',marginLeft:'-13px'}}>
                <List sx={{ width: '105%', maxWidth: '105%', bgcolor: 'background.paper' }}>
                    {transactionData && transactionData.map((transactionData, index) => (
                        <ListItemDespesa onRemoverTransacao={onRemoverTransacao} onAtualizarTrasacao={onAtualizarTrasacao}index={index} dados={transactionData} isPagaTransacao={isPagaTransacao}/>
                    ))}
                </List>
            </Grid>
        </Paper>
    );

}

export default TransacaoModalDespesa;
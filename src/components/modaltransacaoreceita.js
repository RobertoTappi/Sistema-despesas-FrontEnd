import React from 'react';
import { Paper, Grid, List } from '@mui/material';
import ListItemDespesa from './listdespesa';

const TransacaoModalReceita = ({ props, onAtualizarTrasacao, onRemoverTransacao, isPagaTransacao, categorysData }) => {
    const transactionData = props;

    const paperStyle = { padding: '20px',  width: 500, borderRadius: '10px' };

    console.log(transactionData);

    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Contas a Receber</h2>
            </Grid>
            <Grid style={{ width: '100%', maxWidth: '100%',marginLeft:'-13px'}}>
                <List sx={{ width: '105%', maxWidth: '105%', bgcolor: 'background.paper' }}>
                    {transactionData && transactionData.map((transactionData, index) => (
                        <ListItemDespesa onRemoverTransacao={onRemoverTransacao} index={index} dados={transactionData} onAtualizarTrasacao={onAtualizarTrasacao} isPagaTransacao={isPagaTransacao} category={categorysData} categorysData={categorysData && categorysData.find(category => category.id === transactionData.idCategory)} />
                    ))}
                </List>
            </Grid>
        </Paper>
    );
}

export default TransacaoModalReceita;

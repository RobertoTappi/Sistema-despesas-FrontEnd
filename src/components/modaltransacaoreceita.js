import React from 'react';
import { Paper, Grid, List, Typography } from '@mui/material';
import ListItemDespesa from './listdespesa';

const TransacaoModalReceita = ({ props, onAtualizarTrasacao, onRemoverTransacao, isPagaTransacao, categorysData }) => {
    const transactionData = props;

    const paperStyle = { padding: '20px', width: 500, minHeight: '15vh', borderRadius: '10px' };

    console.log(transactionData);

    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Contas a Receber</h2>
            </Grid>
            <Grid style={{ width: '100%', maxWidth: '100%', marginLeft: '-13px' }}>
                {transactionData && transactionData.length > 0 ? (
                    <List sx={{ width: '105%', maxWidth: '105%', bgcolor: 'background.paper' }}>
                        {transactionData && transactionData.map((transactionData, index) => (
                            <ListItemDespesa
                                onRemoverTransacao={onRemoverTransacao}
                                index={index}
                                dados={transactionData}
                                onAtualizarTrasacao={onAtualizarTrasacao}
                                isPagaTransacao={isPagaTransacao}
                                category={categorysData}
                                categorysData={categorysData && categorysData.find(category => category.id === transactionData.idCategory)} />
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" align="center">
                         Você não possui <span style={{fontWeight: 'bolder'}}>receitas</span>!
                    </Typography>
                )}
            </Grid>
        </Paper>
    );
}

export default TransacaoModalReceita;

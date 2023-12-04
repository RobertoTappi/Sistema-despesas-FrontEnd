import React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItemDespesa from './listdespesa';

const TransacaoModalDespesa = ({ props, onAtualizarTrasacao, onRemoverTransacao, isPagaTransacao, categorysData }) => {
    const transactionData = props


    const paperStyle = { padding: 20, minHeight: '15vh', width: 500, borderRadius: '10px' }
    
    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Contas a pagar</h2>
            </Grid>
            <Grid style={{ width: '100%', maxWidth: '100%', marginLeft: '-13px' }}>
                {transactionData && transactionData.length > 0 ? (
                    <List sx={{ width: '105%', maxWidth: '105%', bgcolor: 'background.paper' }}>
                        {transactionData && transactionData.map((transactionData, index) => (
                            <ListItemDespesa
                                onRemoverTransacao={onRemoverTransacao}
                                onAtualizarTrasacao={onAtualizarTrasacao}
                                index={index}
                                dados={transactionData}
                                isPagaTransacao={isPagaTransacao}
                                category={categorysData}
                                categorysData={categorysData && categorysData.find(category => category.id === transactionData.idCategory)} />
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" align="center">
                        Você não possui <span style={{fontWeight: 'bolder'}}>despesas</span>!
                    </Typography>
                )}
            </Grid>
        </Paper>
    );

}

export default TransacaoModalDespesa;
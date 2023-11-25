import React from 'react'
import { Paper, Grid } from '@mui/material'
import List from '@mui/material/List';
import ListItemDespesa from './listdespesa';

const TransacaoModalDespesa = (props) => {
    const transactionData = props.props
    console.log(transactionData)

    const paperStyle = { padding: 20, minHeight: '25vh', width: 500, borderRadius: '10px' }

    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Contas a pagar</h2>
            </Grid>
            <Grid>
                <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                    {transactionData && transactionData.map((transactionData, index) => (
                        <ListItemDespesa index={index} dados={transactionData} />
                    ))}
                </List>
            </Grid>
        </Paper>
    );

}

export default TransacaoModalDespesa;
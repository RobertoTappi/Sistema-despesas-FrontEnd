import React from 'react';
import { Paper, Grid, List } from '@mui/material';
import { FixedSizeList } from 'react-window';
import ListItemDespesa from './listdespesa';

const TransacaoModalReceita = ({ props, onAtualizarTrasacao, onRemoverTransacao, isPagaTransacao, categorysData }) => {
    const transactionData = props;

    const paperStyle = { padding: '20px', maxHeight: '500px', width: 500, borderRadius: '10px' };

    console.log(transactionData);

    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Contas a Receber</h2>
            </Grid>
            <Grid style={{ maxwidth: '80%%' }}>
                <FixedSizeList
                    height={500}
                    width={450}
                    itemSize={5}
                    itemCount={transactionData.length}
                    overscanCount={5}
                >
                    {({ index, style }) => (
                        <ListItemDespesa
                            style={style}
                            onRemoverTransacao={onRemoverTransacao}
                            index={index}
                            dados={transactionData[index]}
                            onAtualizarTrasacao={onAtualizarTrasacao}
                            isPagaTransacao={isPagaTransacao}
                            category={categorysData}
                            categorysData={categorysData.find(category => category.id === transactionData[index].idCategory)}
                        />
                    )}
                </FixedSizeList>
            </Grid>
        </Paper>
    );
}

export default TransacaoModalReceita;

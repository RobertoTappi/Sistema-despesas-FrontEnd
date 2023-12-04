import React from 'react';
import { Paper, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { SaldoAXIOS } from '../services/saldoService';
import { useState } from 'react';
import { useEffect } from 'react';

const paperStyle = { padding: '20px', minHeight: '25vh', width: 500, borderRadius: '10px' };

export const GridSaldo = ({ children }) => {

    const paperStyle = { padding: '20px', width: 500, borderRadius: '10px' };

    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Suas contas</h2>
            </Grid>

            <Grid style={{ width: '100%', maxWidth: '100%' }}>
                {children}
            </Grid>
        </Paper>
    );
}


const ListSaldo = ({ accounts, transacoes }) => {
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        const transacoesARRAY = transacoes && transacoes.transactions;

        const receitaTotal = transacoesARRAY
            ? transacoesARRAY
                .filter(transaction => transaction.type === 'RECEITA' && transaction.isPaga === true)
                .reduce((total, transaction) => total + transaction.valor, 0)
            : 0;

        const despesaTotal = transacoesARRAY
            ? transacoesARRAY
                .filter(transaction => transaction.type === 'DESPESA' && transaction.isPaga === true)
                .reduce((total, transaction) => total + transaction.valor, 0)
            : 0;

        setSaldo(receitaTotal - despesaTotal);

    }, []);


    // const atualizarNavegador = (accountId, saldoNovo) => {
    //     const saldoAlterado = saldo.find(saldo => account.id === accountId)
    //     saldoAlterado.saldo = saldoNovo

    //     if (saldoAlterado) {
    //         setAccounts((prevSaldo) => {
    //             const index = prevSaldo.findIndex((saldo) => saldo.id === accountId);

    //             if (index !== -1) {
    //                 const newCategory = [...prevCategorys];
    //                 newCategory[index] = categoriaEncontrada;
    //                 return newCategory;
    //             }
    //             return prevCategorys;
    //         });
    //     }
    // }

    const handleSaldoStyle = () => {
        return saldo < 0 ? { color: 'red' } : { color: 'green' };
    }

    const formatarSaldo = (saldo) => {
        const saldoFormatado = saldo.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return ` ${saldoFormatado}`;
    };

    return (
        <Grid style={{ width: '100%', maxWidth: '100%', marginLeft: '-13px' }}>
            <ListItem alignItems="flex-start" >
                <AccountBoxIcon style={{ marginTop: '20px', marginLeft: '5px' }} />
                <ListItemText
                    style={{ marginLeft: '22px', marginTop: '20px' }}
                    primary={accounts.name}
                />
                <span style={{ fontWeight: 'bold', marginTop: '20px', ...handleSaldoStyle() }}>
                    {formatarSaldo(saldo)}
                </span>
            </ListItem>
            <Divider variant="inset" />
        </Grid>
    );
};

export default ListSaldo;

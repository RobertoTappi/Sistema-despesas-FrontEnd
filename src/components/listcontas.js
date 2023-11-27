import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditarConta from './modaleditarconta';
import { SaldoAXIOS } from '../services/saldoService';

const ListItemContas = ({ accountsData, removerTransacao }) => {

    const [openModal, setOpenModal] = useState(false);
    const [saldo, setSaldo] = useState(0);
    const [actualName, setActualName] = useState(accountsData.name)

    const token = localStorage.getItem('user');
    const idUser = localStorage.getItem('userId')
    const idAccount = accountsData.id

    const handleClickOpen = () => {
        obterSaldo()
        setOpenModal(true);
    };

    const closeDialog = () => {
        setOpenModal(false);
    };

    const handleActualName = (e) => {
        setActualName(e)
    }

    async function obterSaldo() {
        try {
            const response = await SaldoAXIOS(idUser, idAccount, token);
            console.log(response.data)

            // Tratativa do saldo final
            const receitas = response.data.transactions.filter(transactions => transactions.type === 'RECEITA')

            const despesas = response.data.transactions.filter(transactions => transactions.type === 'DESPESA')

            const somaReceitas = receitas.reduce((total, transactions) => total + transactions.valor, 0);

            const somaDespesas = despesas.reduce((total, transactions) => total + transactions.valor, 0);

            setSaldo(somaReceitas - somaDespesas)

        } catch (error) {
            console.error("erro ao obter o saldo");
        }
    }



    return (
        <>
            <ListItem alignItems="flex-start" button onClick={handleClickOpen}>
                <AccountBoxIcon style={{ marginTop: '20px', marginLeft: '5px' }} />

                <ListItemText
                    style={{ marginLeft: '22px', marginTop: '20px' }}
                    primary={actualName}
                />
            </ListItem >
            <Divider variant="inset" component="li" />

            <EditarConta open={openModal} accountsData={accountsData} onClose={closeDialog} saldo={saldo} handleActualName={handleActualName} removerTransacao={removerTransacao} />
        </>
    );
};

export default ListItemContas;

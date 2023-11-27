import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { CategoriaAXIOS } from '../services/categoriaService';
import EditarCategoria from './modaleditarcategoria';

const ListItemCategorias = ({ categoryReceita, categoryDespesa, categorysData }) => {

    const [openModal, setOpenModal] = useState(false);
    const [actualName, setActualName] = useState(categorysData.nome)

    const token = localStorage.getItem('user');
    const idUser = localStorage.getItem('userId')

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const closeDialog = () => {
        setOpenModal(false);
    };

    const handleActualName = (e) => {
        setActualName(e)
    }

    async function obterCategoria() {
        try {
            const response = await CategoriaAXIOS(idUser, token);
            console.log(response.data)

        } catch (error) {
            console.error("erro ao obter o saldo");
        }
    }

    return (
        <>
            <ListItem alignItems="flex-start" button onClick={handleClickOpen}>
                <AccountBoxIcon style={{ marginTop: '20px', marginLeft: '5px' }} />

                <ListItemText style={{ marginLeft: '22px', marginTop: '20px' }}>
                    {categoryReceita && <div>{categoryReceita.nome}</div>}
                    {categoryDespesa && <div>{categoryDespesa.nome}</div>}
                </ListItemText>
            </ListItem >
            <Divider variant="inset" component="li" />

            <EditarCategoria open={openModal} onClose={closeDialog} categorysData={categorysData} handleActualName={handleActualName} categoryDespesa={categoryDespesa} categoryReceita={categoryReceita} />
        </>
    );
};

export default ListItemCategorias;

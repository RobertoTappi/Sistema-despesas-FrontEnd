import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import EditarCategoria from './modaleditarcategoria';
import { Grid } from '@mui/material';
import { DeletarCategoriaAXIOS } from '../services/deletarCategoria';
import { EditarCategoriaAXIOS } from '../services/editarCategoria';
import { AdicionarCategoriaAXIOS } from '../services/cadastrarCategoria'
import CriarCategoria from './modalcriarcategoria';
import axios from 'axios';
import IconMap from '../util/mapIcons';

const ListItemCategorias = ({ categorysData, atualizarNavegador, onRemoverCategoria, tipoCategoriaPai, createItemListaNavegador }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalAdd, setOpenModalAdd] = useState(false);

    const [actualName, setActualName] = useState();
    const [actualIcon, setActualIcon] = useState();
    const [tipoCategoria, setTipoCategoria] = useState();
    const [idCategoria, setIdCategoria] = useState();

    const token = localStorage.getItem('user');
    const idUser = localStorage.getItem('userId');


    const handleClickOpen = (categoria) => {
        setOpenModal(true);
        setActualName(categoria.nome);
        setActualIcon(categoria.idCon);
        setTipoCategoria(categoria.tipo);
        setIdCategoria(categoria.id);
    };

    const openDialog = () => {
        setOpenModal(true)
    }

    const closeDialog = () => {
        setOpenModal(false);
    };

    const handleIconChange = (iconId) => {
        setActualIcon(iconId);
    };

    const openDialogAdd = () => {
        setOpenModalAdd(true);
    }

    const closeDialogAdd = () => {
        setOpenModalAdd(false);
    };


    const addCategoria = async (nomeCategoria) => {
        try {
            const response = await AdicionarCategoriaAXIOS(nomeCategoria, actualIcon, tipoCategoriaPai, idUser, token);
            createItemListaNavegador(response.data)
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao adicionar a categoria", error);
        }
    };


    const editarCategoria = async (nomeCategoria) => {
        try {
            const response = await EditarCategoriaAXIOS(idCategoria, nomeCategoria, actualIcon, tipoCategoriaPai, idUser, token);
            atualizarNavegador(idCategoria, actualIcon, nomeCategoria)
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao editar a categoria", error);
        }
    };


    const URL = "http://localhost:8080/api/"

    const deletarCategoria = () => {

        try {
            axios.delete(`${URL}category/${idCategoria}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            onRemoverCategoria(idCategoria)
        } catch (error) {
            console.error('Erro ao remover ', error);
        }
    }

  

    return (
        <>
            <Grid style={{ minHeight: '500px' }}>
                {categorysData.map((categoria, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start" button onClick={() => handleClickOpen(categoria)}>
                            <Grid style={{ marginTop: '18px', marginLeft: '5px', marginRight: '15px' }}>
                                {categoria.idCon && <IconMap iconId={categoria.idCon} />}
                            </Grid>
                            <ListItemText style={{ marginLeft: '5px', marginTop: '20px' }}>
                                {categoria && <div>{categoria.nome}</div>}
                            </ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </Grid>

            <EditarCategoria
                open={openModal}
                onClose={closeDialog}
                handleIconChange={handleIconChange}
                deletarCategoria={deletarCategoria}
                editarCategoria={editarCategoria}
                actualName={actualName}
                actualIcon={actualIcon}
            />

            <CriarCategoria
                open={openModalAdd}
                onClose={closeDialogAdd}
                handleIconChange={handleIconChange}
                addCategoria={addCategoria}
            />
        </>
    );
};

export default ListItemCategorias;

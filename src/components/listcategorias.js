import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import EditarCategoria from './modaleditarcategoria';
import { Grid } from '@mui/material';
import { DeletarCategoriaAXIOS } from '../services/deletarCategoria';
import { EditarCategoriaAXIOS } from '../services/editarCategoria';
import { AdicionarCategoriaAXIOS } from '../services/cadastrarCategoria'
import IconeComponent from '../util/mapCategorias';
import CriarCategoria from './modalcriarcategoria';
import axios from 'axios';

const ListItemCategorias = ({ categorysData, atualizarNavegador, onRemoverCategoria }) => {
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
        setActualIcon(categoria.icon);
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
            const response = await AdicionarCategoriaAXIOS(nomeCategoria, actualIcon, tipoCategoria, idUser, token);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao adicionar a categoria", error);
        }
    };


    const editarCategoria = async (nomeCategoria) => {
        try {
            const response = await EditarCategoriaAXIOS(idCategoria, nomeCategoria, actualIcon, tipoCategoria, idUser, token);
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

    console.log(categorysData)

    return (
        <>
            <Grid style={{ minHeight: '500px' }}>
                {categorysData.map((categoria, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start" button onClick={() => handleClickOpen(categoria)}>
                            <Grid style={{ marginTop: '10px', marginLeft: '0px' }}>
                                {categoria.idCon && <IconeComponent iconId={categoria.idCon} />}
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

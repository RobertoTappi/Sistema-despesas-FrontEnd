import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { CategoriaAXIOS } from '../services/categoriaService';
import EditarCategoria from './modaleditarcategoria';
import { Avatar } from '@mui/material';
import DeletarCategoriaAXIOS from '../services/deletarCategoria';
import { EditarCategoriaAXIOS } from '../services/editarCategoria';

const ListItemCategorias = ({ categorysData }) => {
    const [openModal, setOpenModal] = useState(false);
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
        setIdCategoria(categoria.id)
    };

    const closeDialog = () => {
        setOpenModal(false);
    };

    const handleIconChange = (iconId) => {
        setActualIcon(iconId);
    };

    // async function obterCategoria() {
    //     try {
    //         const response = await CategoriaAXIOS(idUser, token);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error("erro ao obter a categoria");
    //     }
    // }

    async function editarCategoria(nomeCategoria) {
        try {
            const response = await EditarCategoriaAXIOS(idCategoria, nomeCategoria, tipoCategoria, idUser, token);
            debugger
            console.log(response.data)

        } catch (error) {
            console.error("erro ao excluir a categoria");
        }
    }

    async function deletarCategoria() {

        try {
            const response = await DeletarCategoriaAXIOS(idCategoria, tipoCategoria, idUser, token);
            console.log(response.data)

        } catch (error) {
            console.error("erro ao excluir a categoria");
        }
    }

    return (
        <>
            {categorysData.map((categoria, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" button onClick={() => handleClickOpen(categoria)}>
                        <Avatar style={{ marginTop: '20px', marginLeft: '5px' }}>

                        </Avatar>

                        <ListItemText style={{ marginLeft: '22px', marginTop: '20px' }}>
                            {categoria && <div>{categoria.nome}</div>}
                        </ListItemText>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}

            <EditarCategoria
                open={openModal}
                onClick={handleClickOpen}
                onClose={closeDialog}
                categorysData={categorysData}
                handleActualName={actualName}
                handleIconChange={handleIconChange}
                deletarCategoria={deletarCategoria}
                editarCategoria={editarCategoria}
            />
        </>
    );
};

export default ListItemCategorias;
import axios from "axios" 

const URL = "http://localhost:8080/api/"

export async function EditarCategoriaAXIOS(idCategory, nomeCategory, idIcon, tipoCategory, idUser, token) {

    let dados = {}

    dados = {
        id: idCategory,
        nome: nomeCategory,
        idCon: idIcon,
        tipo: tipoCategory,
        userId: idUser
    }

    try {
        const response = await axios.put(URL + 'category/alterarCategory', dados, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response

    } catch (error) {
        return error.response
    }
};

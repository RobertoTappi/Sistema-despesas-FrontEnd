import axios from "axios" 

const URL = "http://localhost:8080/api/"

export async function EditarCategoriaAXIOS(idCategory, nomeCategory, tipoCategory, idUser, token) {

    let dados = {}

    dados = {
        id: idCategory,
        nome: nomeCategory,
        idCon: 0,
        tipo: tipoCategory,
        userId: idUser
    }

    try {
        const response = await axios.put(URL + 'category/alterarCategory', dados, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        console.log(response)
        return response

    } catch (error) {
        console.log(error.response)
        return error.response
    }
};

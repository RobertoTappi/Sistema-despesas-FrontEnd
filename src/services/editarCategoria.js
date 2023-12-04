import axios from "axios" 

const URL = "ec2-3-138-157-251.us-east-2.compute.amazonaws.com:8080/api/"

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

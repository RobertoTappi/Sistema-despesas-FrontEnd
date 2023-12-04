import axios from "axios"

const URL = "http://localhost:8080/api/"

export async function EditarContaAXIOS(idAcc, nameAcc, token) {

    let dados = {}

    dados = {
        id : idAcc,
        name: nameAcc
    }

    try {
        const response = await axios.put(URL + 'account/editar', dados, {
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

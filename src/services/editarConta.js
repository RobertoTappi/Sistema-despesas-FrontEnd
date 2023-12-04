import axios from "axios"

const URL = "ec2-3-138-157-251.us-east-2.compute.amazonaws.com:8080/api/"

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
        return response

    } catch (error) {
        return error.response
    }
};

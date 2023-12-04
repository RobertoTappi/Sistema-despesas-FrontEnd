import axios from "axios"

const URL = "ec2-3-138-157-251.us-east-2.compute.amazonaws.com:8080/api/"

export async function AdicionarContaAXIOS(nomeConta, idUser, token) {
    let dados = {}

    dados = {
        id: 0,
        name: nomeConta,
        saldo: 0,
        user: {
            id: idUser
        }
    }

    try {
        const response = await axios.post(URL + 'account', dados, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response

    } catch (error) {
        return error.response
    }
};

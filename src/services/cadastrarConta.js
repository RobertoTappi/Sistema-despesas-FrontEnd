import axios from "axios"

const URL = "https://deploy-backendcoincontrol.onrender.com/api/"

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

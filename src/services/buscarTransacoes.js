import axios from "axios"

const URL = "https://deploy-backendcoincontrol.onrender.com/api/"

export async function BuscarTransacoesAXIOS(idUser, token) {

    try {
        const response = await axios.get(URL + 'account/getAccountsForTransactions/' + idUser, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response

    } catch (error) {
        return error.response
    }
};

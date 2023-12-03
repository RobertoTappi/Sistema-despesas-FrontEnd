import axios from "axios"

const URL = "http://localhost:8080/api/"

export async function BuscarTransacoesAXIOS(idUser, token) {

    try {
        const response = await axios.get(URL + 'account/getAccountsForTransactions/' + idUser, {
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

import axios from "axios"

const URL = "http://localhost:8080/api/"

export async function SaldoAXIOS(idUser, idAccount, token) {
    let dados = {}

    dados = {
        id: idUser,
        name: "string",
        transactions: [
            {
                id: 0,
                valor: 0,
                idCategory: 0,
                descricao: "string",
                creationDate: "string",
                type: "string"
            }
        ]
    }

    try {
        const response = await axios.post(URL + 'account/' + idAccount, dados, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response

    } catch (error) {
        return error.response
    }
};

import axios from "axios"

const URL = "http://localhost:8080/api/transaction/addTransacao"

export async function TransactionAXIOS(idUser, valor, idCategory, descricao, dataTransacao, tipoTransacao, idAccount, token) {
    let dados = {}
    dados = {
        idUser: idUser,
        valor: valor,
        idCategory: idCategory,
        descricao: descricao,
        idAccount: idAccount,
        dataTransacao: dataTransacao,
        tipoTransacao: tipoTransacao,
        account: {
            id: idAccount,
            name: "string",
            saldo: 0
        }
    };
        
    try {
        const response = await axios.post(URL, dados, {
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

import axios from "axios"

const URL = "https://deploy-backendcoincontrol.onrender.com/api/transaction/addTransacao"

export async function TransactionAXIOS(idUser, valor, idCategory, descricao, dataTransacao, tipoTransacao, idAccount,recorrencia,parcelas, token) {
    
    let dados = {}
    dados = {
        idUser: idUser,
        valor: valor,
        idCategory: idCategory,
        descricao: descricao,
        idAccount: idAccount,
        recorencia: recorrencia,
        parcelas: parcelas,
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
        return response

    } catch (error) {
        return error.response
    }
};

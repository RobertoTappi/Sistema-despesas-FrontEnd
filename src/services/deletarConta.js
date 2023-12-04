import axios from "axios"

const URL = "http://localhost:8080/api/"

export async function DeletarContaAXIOS(idAccount, token) {

    try {
        const response = await axios.delete(URL + 'account/' + idAccount, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response

    } catch (error) {
        return error.response
    }
};

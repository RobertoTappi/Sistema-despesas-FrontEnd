import axios from "axios"

const URL = "https://deploy-backendcoincontrol.onrender.com/api/"

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

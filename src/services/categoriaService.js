import axios from "axios"

const URL = "http://localhost:8080/api/"

export async function CategoriaAXIOS(idUser, token) {

    try {
        const response = await axios.post(URL + 'category/' + idUser, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response

    } catch (error) {
        return error.response
    }
};

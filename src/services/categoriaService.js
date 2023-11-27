import axios from "axios"

const URL = "http://localhost:8080/api/"

export async function CategoriaAXIOS(idUser, token) {

    try {
        const response = await axios.post(URL + 'category/' + idUser, {
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

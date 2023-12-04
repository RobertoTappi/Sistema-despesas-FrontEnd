import axios from "axios"

const URL = "ec2-3-138-157-251.us-east-2.compute.amazonaws.com:8080/api/"

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

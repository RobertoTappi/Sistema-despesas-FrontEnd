import axios from "axios"

const URL = "http://localhost:8080/api/user/changePassword"

let credenciais = {}

export async function enviarEmailFunction(email){
    credenciais.email = email;

    try{
        const response = await axios.post(URL,credenciais);
        return response;
    }catch(error){
        return error.response;
    }
}

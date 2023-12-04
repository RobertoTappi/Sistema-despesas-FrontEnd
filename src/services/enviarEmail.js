import axios from "axios"

const URL = "https://deploy-backendcoincontrol.onrender.com/api/user/sendEmailResetPassword"

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

import axios from "axios"

const URL = "ec2-3-138-157-251.us-east-2.compute.amazonaws.com:8080/api/user/sendEmailResetPassword"

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

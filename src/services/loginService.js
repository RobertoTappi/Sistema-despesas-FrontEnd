import axios from "axios"

const URL = "http://localhost:8080/api/user/login"

let credenciais = {}

export async function LoginAXIOS(email,password){
    credenciais.email = email;
    credenciais.password = password;

    try{
        const response = await axios.post(URL,credenciais);
        return response;
    }catch(error){
        return error.response;
    }
}

export async function alterarSenha(token,password){
    let obj = {}
    obj.token = token
    obj.senha = password

    try{
        const response = await axios.put("http://localhost:8080/api/user/changePassword",obj)
        return response;
    }catch(error){
        return error.response;
    }
}


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


    // return new Promise((resolve, reject) => {
    //     credenciais.email = email;
    //     credenciais.password = password;

    //     axios.post(URL, credenciais)
    //         .then(response => {
    //             console.log(response.data);
    //             resolve(response.data); 
    //         })
    //         .catch(error => {
    //             console.error(error.response.data.Mensagem);
    //              reject();
    //         });
    //     });


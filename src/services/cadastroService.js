import axios from "axios"

const URL = "http://localhost:8080/api/user/registrar"

let credenciais = {}

export function RegisterAXIOS(email, password, name) {

    return new Promise((resolve, reject) => {
        credenciais.email = email;
        credenciais.password = password;
        credenciais.name = name;
        credenciais.role = "USER";

        axios.post(URL, credenciais)
            .then(response => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch(error => {
                console.error("Ocorreu um erro na requisição:", error);
                reject(new Error("Erro na requisição"));
            });
    });
}

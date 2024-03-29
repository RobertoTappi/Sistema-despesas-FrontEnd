import axios from "axios"

const URL = "https://deploy-backendcoincontrol.onrender.com/api/user/register"

let credenciais = {}

export async function RegisterAXIOS(email, password, name) {
    credenciais.email = email;
    credenciais.password = password;
    credenciais.name = name;
    credenciais.role = "USER";

    try {
        const response = await axios.post(URL, credenciais)

        return response
    } catch (error) {
        return error.response
    }
}

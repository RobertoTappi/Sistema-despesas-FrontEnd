import axios from "axios"
import { insertData } from "../pages/Cadastro/cadastro"

const URL = "http://localhost:8080/api/user/registrar"

export function Register(){
    axios.post(URL, insertData)
        .then((response) => {
            console.log(response.data)
        })
        .catch(error => console.log(error))
}

export default Register;
import axios from "axios"

const URL = "http://localhost:8080/api/"

export async function AdicionarCategoriaAXIOS(nomeCategoria, idIcon, tipoCategoria, idUser, token) {
    let dados = {}

    dados = {
        id: 0,
        nome: nomeCategoria,
        idCon: idIcon,
        tipo: tipoCategoria,
        userId: idUser
      }

    try {
        const response = await axios.post(URL + 'category/createCategory', dados, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        debugger
        console.log(response)
        return response

    } catch (error) {
        console.log(error.response)
        return error.response
    }
};

import axios from "axios"

const URL = "http://localhost:8080/api/"

export async function DeletarCategoriaAXIOS(idCategory, idIcon, tipoCategory, idUser, token) {

    let dados = {}
    
    dados = {
        id: idCategory,
        nome: "string",
        idCon: idIcon,
        tipo: tipoCategory,
        userId: idUser
    }

    try {
        const response = await axios.delete(URL + 'category/deleteCategory', dados, {
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
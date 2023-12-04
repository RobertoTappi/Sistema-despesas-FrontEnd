import { mapeamentoDeIconesDespesa } from "./mapCategorias";

const IconMap = ({ iconId }) => {

    const iconeEncontrado = mapeamentoDeIconesDespesa.find((icone) => icone.id === iconId)

    if (!iconeEncontrado) {
        return
    }

    return (
        <div style={{ fontSize: '1px' }}>
            {iconeEncontrado.icone}
        </div>
    );
}

export default IconMap;
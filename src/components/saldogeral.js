// Função para calcular o saldo geral
const calcularSaldoGeral = ({ transactionData }) => {
    let saldoGeral = 0;

    if (transactionData) {
        transactionData.forEach((transacao) => {
            
            if (transacao.isPaga) {
                saldoGeral += transacao.type === "RECEITA" ? transacao.valor : -transacao.valor;
            }
        });
    }

    return saldoGeral;
};

export default calcularSaldoGeral;

import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Importar a extensão
function retornaValor(dados) {
  if (dados && dados != null && dados != undefined) {
    return dados.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
}

const RelatorioPDF = ({ transacaoData }) => {
  useEffect(() => {
    const generatePDF = () => {
      const doc = new jsPDF();

      doc.setFontSize(18);
      const title = 'CoinControl - Relatório Mensal';
      const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
      doc.text(title, titleX, 15);


      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);

 
      const sortedTransacoes = transacaoData.sort((a, b) => {
        const dateA = new Date(a.creationDate.split('/').reverse().join('/'));
        const dateB = new Date(b.creationDate.split('/').reverse().join('/'));
        return dateA - dateB;
      });


      let yPosition = 30;


      const headers = ['Descrição', 'Valor', 'Data da Transação', 'Tipo'];
      const data = sortedTransacoes.map(transaction => [
        transaction.descricao,
        
        `${transaction.type === 'RECEITA' ? retornaValor(transaction.valor): retornaValor(-transaction.valor)}`,
        transaction.creationDate,
        transaction.type,
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [headers],
        body: data,
        theme: 'striped',
      });


      const receitaTotal = sortedTransacoes
        .filter(transaction => transaction.type === 'RECEITA')
        .reduce((total, transaction) => total + transaction.valor, 0);

      const despesaTotal = sortedTransacoes
        .filter(transaction => transaction.type === 'DESPESA')
        .reduce((total, transaction) => total + transaction.valor, 0);

      const saldo = receitaTotal - despesaTotal;


      const totalsX = doc.internal.pageSize.width - 70;
      const totalsY = doc.internal.pageSize.height - 3;
      doc.text(`Receita Total: ${retornaValor(receitaTotal)}`, totalsX, totalsY - 10);
      doc.text(`Despesa Total: ${retornaValor(despesaTotal)}`, totalsX, totalsY - 5);
      doc.text(`Saldo:${retornaValor(saldo)}`, totalsX, totalsY);


      doc.save('CoinControl_RelatorioMensal.pdf');
    };

    generatePDF();
  }, [transacaoData]);

  return (
    <div>

    </div>
  );
};

export default RelatorioPDF;

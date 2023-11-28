import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../components/navbar';
import axios from 'axios';
import TransacaoModalDespesa from '../../components/modaltransacaodespesa.js'
import TransacaoModalReceita from '../../components/modaltransacaoreceita.js'
import AcessoRapido from '../../components/modalacessorapido.js';
import DashBoardGastosMensais from '../../components/dashboardmensal';
// Estilos

const transacaoStyle = { display: 'flex', gap: '70px', justifyContent: 'center'}


const URL = "http://localhost:8080/api/"


const Principal = () => {
  const [accountsData, setAccounts] = useState(null)
  const [transactionData, setTransaction] = useState([])
  const [categorysData, setCategory] = useState(null)
  const [dadosUser,setDadosUser] = useState(null)
  const token = localStorage.getItem('user');
  const idUser = localStorage.getItem('userId')
  const [isValidToken, setIsValidToken] = useState(null);


  useEffect(() => {


    const obterAccounts = async () => {
      try {
        const response = await axios.get(URL + 'account/findAllAccounts/' + idUser, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log("data accounts",{response})
        setAccounts(response.data);
        console.log(accountsData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    const obterCategory = async () => {
      try {
        const response = await axios.get(URL + 'category/' + idUser, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        setCategory(response.data);
        console.log("category accounts",{response})

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    const obterTransacoes = async () => {
      try {
        const response = await axios.get(URL + 'transaction/getTransacoes/' + idUser, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        const converterStringParaData = (dataString) => {
          const [dia, mes, ano] = dataString.split('/');
          return new Date(parseInt(ano, 10), parseInt(mes, 10) - 1, parseInt(dia, 10));
        };
          const dataAtual = new Date();

          const transacoesDoMesAtual = response.data.filter(transacao => {
            const partesData = transacao.creationDate.split('/');
            const dataDaTransacao = converterStringParaData(transacao.creationDate);
          
            // Verificar se a data da transação está no mesmo mês e ano e não é no futuro
            return (
              dataDaTransacao.getFullYear() === dataAtual.getFullYear() &&
              dataDaTransacao.getMonth() === dataAtual.getMonth() &&
              dataDaTransacao.getDate() >= dataAtual.getDate()
            );
          });
          

          transacoesDoMesAtual.sort((a, b) => {
            const dataA = converterStringParaData(a.creationDate)
            const dataB = converterStringParaData(b.creationDate)
            return dataA - dataB;
          });
          setTransaction(transacoesDoMesAtual);
        
        
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    const obterDadosUser = async () => {
      try {
        const response = await axios.get(URL + 'user/' + idUser, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log("user",response)
        setDadosUser(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    obterDadosUser();
    obterCategory();
    obterTransacoes();
    obterAccounts();
  }, []);


const adicionarTransacao = (novaTransacao) => {
    setTransaction((prevTransaction) => [...prevTransaction, novaTransacao]);
};

const atualizarTransacao = (novaTransacao) => {
  if(novaTransacao){
    setTransaction((prevTransactions) => {
      const index = prevTransactions.findIndex((transacao) => transacao.id === novaTransacao.id);

      if (index !== -1) {
        const newTransactions = [...prevTransactions];


        newTransactions[index] = novaTransacao;
        return newTransactions;
      }
      return prevTransactions;
    });
  }
}

const removerTransacao = (transacaoId) => {
  setTransaction((prevTransactions) =>
    prevTransactions.filter((transacao) => transacao.id !== transacaoId)
  );
};

return (
  <Grid>
    <NavBar></NavBar>

    <AcessoRapido onAdicionarTransacao={adicionarTransacao} accounts={accountsData} category={categorysData} transacitons={transactionData} userName={dadosUser} ></AcessoRapido>

    <Grid style={transacaoStyle}>
      <TransacaoModalReceita onRemoverTransacao={removerTransacao} onAtualizarTrasacao={atualizarTransacao} props={transactionData && transactionData.filter(transaction => transaction.type === "RECEITA")}></TransacaoModalReceita>
      <TransacaoModalDespesa onRemoverTransacao={removerTransacao}onAtualizarTrasacao={atualizarTransacao} props={transactionData && transactionData.filter(transaction => transaction.type === "DESPESA")}></TransacaoModalDespesa>
    </Grid>

    <Grid>
      <DashBoardGastosMensais categories={categorysData} gastosMensais={transactionData && transactionData.filter(transaction => transaction.type === "DESPESA")} ></DashBoardGastosMensais>
    </Grid>

  </Grid>
)
}

export default Principal;

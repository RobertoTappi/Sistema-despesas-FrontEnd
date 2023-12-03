import React, { useEffect, useState } from 'react';
import { Grid, List, ListItem } from '@mui/material';
import NavBar from '../../components/navbar';
import axios from 'axios';
import TransacaoModalDespesa from '../../components/modaltransacaodespesa.js'
import TransacaoModalReceita from '../../components/modaltransacaoreceita.js'
import AcessoRapido from '../../components/modalacessorapido.js';
import DashBoardGastosMensais from '../../components/dashboardmensal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListSaldo, { GridSaldo } from '../../components/listsaldo.js';
import { BuscarTransacoesAXIOS } from '../../services/buscarTransacoes.js';

// Estilos
const transacaoStyle = { display: 'flex', gap: '50px', flexDirection: 'column', alignItems: 'center', marginLeft: '20px', marginRight: '20px' }

const displayGrid = { display: 'flex', justifyContent: 'center', marginLeft: '-20px' }


const URL = "http://localhost:8080/api/"


const Principal = () => {
  const [accountsData, setAccounts] = useState(null)
  const [transactionData, setTransaction] = useState([])
  const [categorysData, setCategory] = useState(null)
  const [dadosUser, setDadosUser] = useState(null)
  const [accountTransaction, setAccountTransaction] = useState(null)

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
        console.log("data accounts", { response })
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
        console.log("category accounts", { response })

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
            !transacao.isPaga &&
            dataDaTransacao.getFullYear() === dataAtual.getFullYear() &&
            dataDaTransacao.getMonth() === dataAtual.getMonth()

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
      console.log(obterTransacoes)
    };

    const obterDadosUser = async () => {
      try {
        const response = await axios.get(URL + 'user/' + idUser, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log("user", response)
        setDadosUser(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    async function obterSaldoContas() {

      try {
        const response = await BuscarTransacoesAXIOS(idUser, token);
        console.log(response.data)
        setAccountTransaction(response.data)

      } catch (error) {
        console.error("erro ao obter o saldo");
      }
    }
    obterDadosUser();
    obterCategory();
    obterTransacoes();
    obterAccounts();
    obterSaldoContas();
  }, []);

  const adicionarTransacao = (novaTransacao) => {
    setTransaction((prevTransaction) => [...prevTransaction, novaTransacao]);
  };

  const atualizarTransacao = (novaTransacao) => {

    if (novaTransacao) {
      setTransaction((prevTransactions) => {
        const index = prevTransactions && prevTransactions.findIndex((transacao) => transacao.id === novaTransacao.id);

        if (index !== -1) {
          const newTransactions = [...prevTransactions];


          newTransactions[index] = novaTransacao;
          return newTransactions;
        }
        return prevTransactions;
      });
    }
  }

  const isPagaTransacao = (transacaoId) => {
    const Transacao = transactionData && transactionData.find((transacao) => transacao.id === transacaoId);
    const data = {
      idTransaction: Transacao.id,
      idUser: idUser,
      valor: Transacao.valor,
      idCategory: Transacao.idCategory,
      descricao: Transacao.descricao,
      idAccount: Transacao.idAccount,
      isPaga: true,
      dataTransacao: Transacao.creationDate,
      tipoTransacao: Transacao.type,
      account: {
        id: Transacao.idAccount,
      }
    }
    try {
      const response = axios.put(URL + 'transaction/alteraTransacao', data, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      toast.success('Conta paga com sucesso!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTransaction((prevTransactions) =>
        prevTransactions.filter((transacao) => transacao.id !== transacaoId)
      );

      let contas;

      for(const conta of accountTransaction) {
        contas = conta.transactions = conta.transactions.map((transacao) =>{
          if(transacao.id === transacaoId) {
            return {...transacao, ...data};
          } 

          return transacao
        })
      }

      setAccountTransaction(contas)

    } catch (error) {
      console.error('Erro ao buscar dados: accounts', error);
    }
  }

  const removerTransacao = (transacaoId) => {
    setTransaction((prevTransactions) =>
      prevTransactions.filter((transacao) => transacao.id !== transacaoId)
    );
  };


  return (
    <Grid>
      <ToastContainer />
      <NavBar></NavBar>

      <AcessoRapido onAdicionarTransacao={adicionarTransacao} accounts={accountsData} category={categorysData} transacitons={transactionData} userName={dadosUser} ></AcessoRapido>

      <Grid style={displayGrid}>

        <Grid id="ContasDash" style={transacaoStyle}>

          <GridSaldo>
            {accountsData && accountsData.map((accountsData, index) => (
              <ListSaldo index={index} accounts={accountsData} transacoes={accountTransaction && accountTransaction.find((account) => account.id === accountsData.id)} />
            ))}
          </GridSaldo>

          <DashBoardGastosMensais categories={categorysData} gastosMensais={transactionData && transactionData.filter(transaction => transaction.type === "DESPESA")} ></DashBoardGastosMensais>
        </Grid>

        <Grid id="Lançamentos" style={transacaoStyle}>
          <TransacaoModalReceita onRemoverTransacao={removerTransacao} onAtualizarTrasacao={atualizarTransacao} props={transactionData && transactionData.filter(transaction => transaction.type === "RECEITA")} isPagaTransacao={isPagaTransacao} categorysData={categorysData} ></TransacaoModalReceita>

          <TransacaoModalDespesa onRemoverTransacao={removerTransacao} onAtualizarTrasacao={atualizarTransacao} props={transactionData && transactionData.filter(transaction => transaction.type === "DESPESA")} isPagaTransacao={isPagaTransacao} categorysData={categorysData} ></TransacaoModalDespesa>
        </Grid>

      </Grid>
    </Grid>
  )
}
export default Principal;

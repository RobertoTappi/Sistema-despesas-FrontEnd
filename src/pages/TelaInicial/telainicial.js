import React, { useEffect, useState } from 'react';
import { Grid, List, ListItem, debounce } from '@mui/material';
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
import { DisabledByDefault } from '@mui/icons-material';

// Estilos
const transacaoStyle = { display: 'flex', gap: '50px', flexDirection: 'column', alignItems: 'center', marginLeft: '20px', marginRight: '20px' }

const displayGrid = { display: 'flex', justifyContent: 'center', marginLeft: '-20px' }


const URL = "https://deploy-backendcoincontrol.onrender.com/api/"


const Principal = () => {
  const [accountsData, setAccounts] = useState(null)
  const [transactionData, setTransaction] = useState([])
  const [categorysData, setCategory] = useState(null)
  const [dadosUser, setDadosUser] = useState(null)
  const [accountTransaction, setAccountTransaction] = useState(null)
  const [accountTransactionGeral, setAccountTransactionGeral] = useState(null)
  const [transactionDashboard,setTransactionDashboard] = useState([])
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
        setAccounts(response.data);
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

          return (
            !transacao.isPaga &&
            dataDaTransacao.getFullYear() === dataAtual.getFullYear() &&
            dataDaTransacao.getMonth() === dataAtual.getMonth()

          );
        });

        setTransactionDashboard(transacoesDoMesAtual);

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
        setDadosUser(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    async function obterSaldoContas() {
      try {
        const response = await BuscarTransacoesAXIOS(idUser, token);
        setAccountTransaction(response.data)

      } catch (error) {
        console.error("erro ao obter o saldo");
      }
    }

     obterDadosUser();
     obterCategory();
     obterAccounts();
     obterSaldoContas();
     obterTransacoes();
  }, []);

  useEffect(()=>{
    if(accountTransaction){
      setAccountTransaction(accountTransaction)
    }

  },[accountTransaction])

  const calcularSaldoTotal = () => {
    let saldoTotal = 0;

    if (accountTransaction && accountTransaction.length > 0) {
      accountTransaction.forEach((account) => {
        if (account.transactions && account.transactions.length > 0) {
          account.transactions.forEach((transaction) => {
            if (transaction.isPaga) {
              saldoTotal += transaction.type === 'RECEITA' ? transaction.valor : -transaction.valor;
            }
          });
        }
      });
    }
    return saldoTotal;
  };

  const saldoGeral = calcularSaldoTotal();

  const adicionarTransacao = (novaTransacao) => {
    setTransaction((prevTransaction) => [...prevTransaction, novaTransacao]);
    setTransactionDashboard((prevTransaction) => [...prevTransaction, novaTransacao])
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

  const isPagaTransacao = async (transacaoId) => {
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
      const response = await axios.put(URL + 'transaction/alteraTransacao', data, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      setTransaction((prevTransactions) =>
        prevTransactions.filter((transacao) => transacao.id !== transacaoId)
      );

      let dataAbc = {
        id: Transacao.id,
        valor: Transacao.valor,
        idCategory: Transacao.idCategory,
        descricao: Transacao.descricao,
        creationDate: Transacao.creationDate,
        type: Transacao.type,
        idAccount: Transacao.idAccount,
        recorencia: Transacao.recorencia,
        parcelas: Transacao.parcelas,
        idTransacaoPai: Transacao.idTransacaoPai,
        isPaga: true
      }

       setAccountTransaction((prevState) =>
        prevState.map((conta) =>
          conta.id === dataAbc.idAccount
            ? {
              ...conta,
              transactions: [
                ...conta.transactions,
                dataAbc
              ],
            }
            : conta
        )
      );

      setAccountTransaction((prevState) =>
  prevState.map((conta) =>
    conta.id === data.idAccount
      ? {
          ...conta,
          transactions: conta.transactions
            ? [
                ...conta.transactions,
                {
                  dataAbc
                },
              ]
            : [
                {
                  dataAbc
                },
              ],
        }
      : conta
  )
);


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

    } catch (error) {
      console.error('Erro ao buscar dados: accounts', error);
    }
  }
  
  const removerTransacao = (transacaoId) => {
    setTransaction((prevTransactions) =>
      prevTransactions.filter((transacao) => transacao.id !== transacaoId)
    );
    setTransactionDashboard((prevTransactions) =>
    prevTransactions.filter((transacao) => transacao.id !== transacaoId)
    );
  };



  return (
    <Grid>
      <ToastContainer />
      <NavBar></NavBar>

      <AcessoRapido onAdicionarTransacao={adicionarTransacao} accounts={accountsData} category={categorysData} transacitons={transactionData} userName={dadosUser} saldoTotal={saldoGeral}></AcessoRapido>

      <Grid style={displayGrid}>

        <Grid id="ContasDash" style={transacaoStyle}>

          <GridSaldo>
            {accountsData && accountsData.map((accountsData, index) => (
              <ListSaldo index={index} accounts={accountsData} transacoes={accountTransaction && accountTransaction.find((account) => account.id === accountsData.id)} />
            ))}
          </GridSaldo>

          <DashBoardGastosMensais categories={categorysData} gastosMensais={transactionDashboard && transactionDashboard.filter(transaction => transaction.type === "DESPESA")} ></DashBoardGastosMensais>
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

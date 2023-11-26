import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../components/navbar';
import axios from 'axios';
import TransacaoModalDespesa from '../../components/modaltransacaodespesa.js'
import TransacaoModalReceita from '../../components/modaltransacaoreceita.js'
import AcessoRapido from '../../components/modalacessorapido.js';

// Estilos

const transacaoStyle = { display: 'flex', gap: '70px', justifyContent: 'center'}


const URL = "http://localhost:8080/api/"


const Principal = () => {
  const [accountsData, setAccounts] = useState(null)
  const [transactionData, setTransaction] = useState(null)
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
        setTransaction(response.data)
        debugger
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
    if(transactionData){
      setTransaction((prevTransaction) => [...prevTransaction, novaTransacao]);
    }
};

return (
  <Grid>
    <NavBar></NavBar>

    <AcessoRapido onAdicionarTransacao={adicionarTransacao} accounts={accountsData} category={categorysData} transacitons={transactionData} userName={dadosUser} ></AcessoRapido>

    <Grid style={transacaoStyle}>
      <TransacaoModalReceita props={transactionData && transactionData.filter(transaction => transaction.type === "RECEITA")}></TransacaoModalReceita>
      <TransacaoModalDespesa props={transactionData && transactionData.filter(transaction => transaction.type === "DESPESA")}></TransacaoModalDespesa>
    </Grid>

  </Grid>
)
}

export default Principal;

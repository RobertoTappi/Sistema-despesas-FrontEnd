import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../components/navbar';
// import ModalDespesa from '../../components/modal';
// import ModalReceita from '../../components/modal2'
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
  const token = localStorage.getItem('user');
  const idUser = localStorage.getItem('userId')


  useEffect(() => {

    const obterAccounts = async () => {
      try {
        const response = await axios.get(URL + 'account/' + idUser, {
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
        console.log(response.data)

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
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    obterCategory();
    obterTransacoes();
    obterAccounts();
  }, []);


  const adicionarTransacao = (novaTransacao) => {
    console.log( "aqui")
    setTransaction((prevTransaction) => [...prevTransaction, novaTransacao]);
};


  return (
    <Grid>
      <NavBar></NavBar>

      <AcessoRapido onAdicionarTransacao={adicionarTransacao} accounts={accountsData} category={categorysData} ></AcessoRapido>

      <Grid style={transacaoStyle}>
        <TransacaoModalReceita props={transactionData && transactionData.filter(transaction => transaction.type === "RECEITA")}></TransacaoModalReceita>
        <TransacaoModalDespesa props={transactionData && transactionData.filter(transaction => transaction.type === "DESPESA")}></TransacaoModalDespesa>
      </Grid>

    </Grid>
  )
}

export default Principal;

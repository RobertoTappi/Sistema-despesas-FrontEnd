import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../components/navbar';
import ModalDespesa from '../../components/modal';
import ModalReceita from '../../components/modal2'
import BasicModal from '../../components/modal';
import axios from 'axios';
import TransacaoModalDespesa from '../../components/modaltransacaodespesa.js'


const URL = "http://localhost:8080/api/"


const Principal = () => {
  const [accountsData, setAccounts] = useState(null)
  const [transactionData,setTransaction] = useState(null)

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

     const obterTransacoes = async () =>{
         try{
             const response = await axios.get(URL+'transaction/getTransacoes/'+ idUser,{
              headers:{
                Authorization: 'Bearer ' + token
              }
             });
            setTransaction(response.data)

            console.log(response)
         }catch(error){
          console.error('Erro ao buscar dados:', error);
         }
     };

    obterTransacoes();
    obterAccounts(); // Chama a função ao montar o componente
  }, []);




  return (
    <Grid>
      <NavBar></NavBar>
      <ModalReceita accounts={accountsData}></ModalReceita>
      <ModalDespesa accounts={accountsData}></ModalDespesa>
      <TransacaoModalDespesa props={transactionData && transactionData.filter(transaction => transaction.type === "DESPESA")}></TransacaoModalDespesa>
    </Grid>
  )
}
export default Principal;

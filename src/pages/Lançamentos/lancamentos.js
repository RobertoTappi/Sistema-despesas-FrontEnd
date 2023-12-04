import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import axios from "axios";
import { Paper, Grid, Container, Button, Menu } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ModalPaiListTransa from "../../components/modalpailisttransa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RelatorioPDF from "../../util/pdf";
import ModalTransaction from "../../components/modalTransaction";

const URL = "http://localhost:8080/api/";

const paperStyle = {
  minHeight: "1100px",
  maxWidth: "1200px",
  margin: "10px auto",
  borderRadius: "20px",
};
const headerStyle = {
  borderRadius: "20px",
  maxHeight: "110px",
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

const styleFontRelatorio = {
  fontSize: "20px"
}

const Lancamentos = () => {
  const token = localStorage.getItem("user");
  const idUser = localStorage.getItem("userId");
  const [transactionData, setTransaction] = useState([]);
  const [accountsData, setAccounts] = useState(null)
  const [meseano,setMesAno] = useState(null)
  const [TransacoesPorDia,setTransacoesDay] = useState({})
  const [CategoryData , setCategoryData] = useState([])
  const [transacaoParaRelatorio, setTransacaoRelatorio] = useState([]);
  const [showRelatorio, setShowRelatorio] = useState(false);
  const [transacaoParaRelatorioNotEffect, setTransacaoRelatorioNotEffect] = useState([]);
  const displayMonth = () => {
    return `${monthNames[currentMonth]} ${currentYear}`;
  };
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0; 
      }
      return prevMonth + 1;
    });
  };
  
  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      const newYear = prevMonth === 0 ? currentYear - 1 : currentYear;
  
      setCurrentYear(newYear);
  
      return newMonth;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNextMonth();
      } else if (event.key === "ArrowLeft") {
        handlePreviousMonth();
      }
    };
    document.addEventListener("keydown", handleKeyDown);


    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextMonth, handlePreviousMonth,]);

  useEffect(() => {
    
    const dataAtual = new Date();
    setMesAno((dataAtual.getMonth()+1)+"/"+dataAtual.getFullYear())

    const obterTransacoes = async () => {
      try {
        const response = await axios.get(URL + "transaction/getTransacoes/" + idUser, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });


        const transacoesPorData = response.data;


        const transacoes2023 = transacoesPorData.filter(transacao => {
          const ano = transacao && transacao.creationDate.split('/')[2];
          return ano === currentYear.toString();
        });
        setTransacaoRelatorio(transacoes2023.filter(transacao => {
          const [dia, mes, ano] = transacao && transacao.creationDate.split('/');
          return parseInt(mes, 10) === currentMonth + 1 && parseInt(ano, 10) === currentYear;
        }));


        transacoes2023.forEach(transacao => {
          const [dia, mes, ano] = transacao && transacao.creationDate.split('/');
          const chave = `${dia}/${mes}`;

          if (!transacoesPorData[chave]) {
            transacoesPorData[chave] = [];
          }

          transacoesPorData[chave].push(transacao);
        });

    

        const transacoesFiltradas = transacoesPorData.filter(transacao => {
          const [dia, mes, ano] = transacao && transacao.creationDate.split('/');
          return parseInt(mes, 10) === currentMonth + 1 && parseInt(ano, 10) === currentYear;
        });

        const transacoesPorDia = {};
        transacoesFiltradas.forEach(transacao => {
          const [dia, mes] = transacao && transacao.creationDate.split('/');
          const chave = `${dia}/${mes}`;

          if (!transacoesPorDia[chave]) {
            transacoesPorDia[chave] = [];
          }

          transacoesPorDia[chave].push(transacao);
        });

        const arrayDePares = Object.entries(transacoesPorDia);
        const ordenado = arrayDePares.sort(([dataA], [dataB]) => {

          const [diaA, mesA] = dataA && dataA.split('/');
          const [diaB, mesB] =  dataB && dataB.split('/');
          const dataFormatadaA = `${mesA}${diaA.padStart(2, '0')}`;
          const dataFormatadaB = `${mesB}${diaB.padStart(2, '0')}`;

          return dataFormatadaA - dataFormatadaB;
        });

        const arrayOrdenado = Object.fromEntries(ordenado);

        setTransacoesDay(arrayOrdenado);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

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
        setCategoryData(response.data);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    obterCategory();
    obterAccounts();
    obterTransacoes();
  }, [idUser, token,meseano,currentMonth, currentYear]);




  const monthNames = [
    "Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro",
    "Novembro", "Dezembro",
  ];



  // const [openModal, setOpenModal] = useState(false);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [tipoOpenModal, setTipoOpenModal] = useState(null);

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleClickReceita = () => {
  //   setOpenModal(true);
  //   setTipoOpenModal("RECEITA");
  //   handleCloseUserMenu();
  // };

  // const handleClickDespesa = () => {
  //   setOpenModal(true);
  //   setTipoOpenModal("DESPESA");
  //   handleCloseUserMenu();
  // };

  // const handleClose = () => {
  //   setTipoOpenModal(null);
  //   setOpenModal(false);
  // };



  const isPagaTransacao = (transacaoId , attTrue) => {

    let foundTransaction;
    
    for (const dia in TransacoesPorDia) {
      foundTransaction = TransacoesPorDia[dia].find(
        (transacao) => transacao.id === transacaoId
      );
  
      if (foundTransaction) {
        break; 
      }
    }
  
    if (!foundTransaction) {
      console.error("Transaction not found");
      return;
    }
      
    const data = {
      idTransaction: foundTransaction.id,
      idUser: idUser,
      valor: foundTransaction.valor,
      idCategory: foundTransaction.idCategory,
      descricao: foundTransaction.descricao,
      idAccount: foundTransaction.idAccount,
      isPaga: attTrue,
      dataTransacao: foundTransaction.creationDate,
      tipoTransacao: foundTransaction.type,
      account: {
        id: foundTransaction.idAccount,
      },
    };
  
    try {
      const response = axios.put(URL + 'transaction/alteraTransacao', data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      
        if(attTrue){
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
        }else{
          toast.success('Conta marcada como nao paga com sucesso!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

      setTransacoesDay((prevTransacoesPorDia) => {
        const novoTransacoesPorDia = { ...prevTransacoesPorDia };
      
        for (const dia in novoTransacoesPorDia) {
          novoTransacoesPorDia[dia] = novoTransacoesPorDia[dia].map((transacao) => {
            if (transacao.id === transacaoId) {

              return { ...transacao, isPaga: attTrue };
            }
            return transacao;
          });
        }
      
        return novoTransacoesPorDia;
      });
      


    } catch (error) {
      console.error('Erro ao buscar dados: accounts', error);
    }
  };


  

  const atualizarTransacao = (novaTransacao) => {
    // novaTransacao.idCategory 

    if (novaTransacao) {
      setTransacoesDay((prevTransactions) => {
        const { id } = novaTransacao;
  
        // Percorre todos os dias/meses para encontrar a transação com o ID correspondente
        for (const diaMes in prevTransactions) {
          const [diaFormatAntigo, mesFormatAntigo] = diaMes && diaMes.split("/");
          
          const transacoesDoDia = prevTransactions[diaMes];
          
          const index = transacoesDoDia.findIndex((transacao) => transacao.id === id);
          
          if (index !== -1) {
            // Encontrou a transação com o ID correspondente
            const transacaoAntiga = transacoesDoDia[index];
            
            // Remove a transação antiga do bloco antigo
            prevTransactions[diaMes] = transacoesDoDia.filter((transacao) => transacao.id !== id);
            
            // Remove o bloco antigo se estiver vazio
            if (prevTransactions[diaMes].length === 0) {
              delete prevTransactions[diaMes];
            }
  
            // Adiciona a nova transação ao bloco novo
            const [diaFormatNovo, mesFormatNovo] = novaTransacao && novaTransacao.creationDate.split("/");
            
            if (!prevTransactions[diaFormatNovo + '/' + mesFormatNovo]) {
              prevTransactions[diaFormatNovo + '/' + mesFormatNovo] = [];
            }
            prevTransactions[diaFormatNovo + '/' + mesFormatNovo].push(novaTransacao);
  
            // Ordena as transações do bloco novo
            const arrayDePares = Object.entries(prevTransactions);
            const ordenado = arrayDePares.sort(([dataA], [dataB]) => {
              const [diaA, mesA] = dataA && dataA.split('/');
              const [diaB, mesB] = dataB && dataB.split('/');
              const dataFormatadaA = `${mesA}${diaA.padStart(2, '0')}`;
              const dataFormatadaB = `${mesB}${diaB.padStart(2, '0')}`;
    
              return dataFormatadaA - dataFormatadaB;
            });
    
            // Retorna a lista ordenada
            return Object.fromEntries(ordenado);
          }
        }
  
        return { ...prevTransactions };
      });
    }
  };
    
  

  const adicionarTransacao = (novaTransacao) => {
    if (novaTransacao) {
      setTransacoesDay((prevTransactions) => {
        const { creationDate } = novaTransacao;
        const [diaFormat, mesFormat] = creationDate && creationDate.split("/");
  
        let updatedTransactions;
  
        if (prevTransactions[diaFormat + '/' + mesFormat]) {
          updatedTransactions = {
            ...prevTransactions,
            [diaFormat + '/' + mesFormat]: [
              ...(prevTransactions[diaFormat + '/' + mesFormat] || []),
              novaTransacao,
            ],
          };
        } else {
          const arrayDePares = Object.entries({
            ...prevTransactions,
            [diaFormat + '/' + mesFormat]: [novaTransacao],
          });
  
          const ordenado = arrayDePares.sort(([dataA], [dataB]) => {
            const [diaA, mesA] = dataA &&dataA.split('/');
            const [diaB, mesB] = dataB &&dataB.split('/');
            const dataFormatadaA = `${mesA}${diaA.padStart(2, '0')}`;
            const dataFormatadaB = `${mesB}${diaB.padStart(2, '0')}`;
  
            return dataFormatadaA - dataFormatadaB;
          });
  
          updatedTransactions = Object.fromEntries(ordenado);
        }
  
        return updatedTransactions;
      });
    }
  };
  
  const removerTransacao = (transacaoId) => {
    setTransacoesDay((prevTransacoesPorDia) => {
      const novoTransacoesPorDia = { ...prevTransacoesPorDia };
  
      // Itera sobre as chaves do objeto e remove a transação do bloco
      for (const dia in novoTransacoesPorDia) {
        novoTransacoesPorDia[dia] = novoTransacoesPorDia[dia].filter(
          (transacao) => transacao.id !== transacaoId
        );
      }
  
      // Remove os blocos que ficaram vazios após a remoção
      const blocosNaoVazios = Object.entries(novoTransacoesPorDia)
        .filter(([_, transacoes]) => transacoes.length > 0)
        .reduce((acc, [dia, transacoes]) => {
          acc[dia] = transacoes;
          return acc;
        }, {});
  
      // Ordena novamente o objeto com base nas chaves
      const arrayDePares = Object.entries(blocosNaoVazios).sort(([dataA], [dataB]) => {
        const [diaA, mesA] = dataA.split('/');
        const [diaB, mesB] = dataB.split('/');
        const dataFormatadaA = `${mesA}${diaA.padStart(2, '0')}`;
        const dataFormatadaB = `${mesB}${diaB.padStart(2, '0')}`;
  
        return dataFormatadaA - dataFormatadaB;
      });
  
      const updatedTransactions = Object.fromEntries(arrayDePares);
  
      return updatedTransactions;
    });
  };
  

  // const removerTransacao = (transacaoId) =>{
  //       debugger;
  //       setTransacoesDay((prevTransacoesPorDia) => {
  //       const novoTransacoesPorDia = { ...prevTransacoesPorDia };
  
  //       // for (const dia in novoTransacoesPorDia) {
  //       //   novoTransacoesPorDia[dia] = novoTransacoesPorDia[dia].filter(
  //       //     (transacao) => transacao.id !== transacaoId
  //       //   );
  //       // }
  
  //       return novoTransacoesPorDia;
  //     });
  // }

  function retornaValor(dados) {
    if (dados && dados != null && dados != undefined) {
      return dados.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
  }

  const obterReceitaMensal = () => {

    let totalReceita = 0;
  
    for (const dia in TransacoesPorDia) {
      TransacoesPorDia[dia].forEach((transacao) => {
        // Filtra apenas as transações do tipo RECEITA
        if (transacao.type === 'RECEITA') {
          totalReceita += transacao.valor;
        }
      });
    }
    return totalReceita;
  };

  const obterDespesaMensal = () => {
    let totalReceita = 0;
  
    for (const dia in TransacoesPorDia) {
      TransacoesPorDia[dia].forEach((transacao) => {

        if (transacao.type === 'DESPESA') {
          totalReceita -= transacao.valor;
        }
      });
    }
    return totalReceita;
  }


  const handleGerarPDF = () => {
    setShowRelatorio(true);

    setTransacaoRelatorioNotEffect(transacaoParaRelatorio)

  };
  
  const saldoTotal = obterReceitaMensal() + obterDespesaMensal()

  return (
    <Grid>
      <ToastContainer />
      <NavBar />
      <Container>
        <Paper elevation={10} style={paperStyle}>
          <Grid container>
            <div style={{ ...headerStyle, width: "100%", borderBottom: '1px solid black',borderRadius: "0 0 5px 5px"}}>
              <h1 style={{ textAlign: "center", maxWidth: "100%", width: "100%" }}>
                <ArrowBackIosIcon
                  style={{ fontSize: "25px", color: "#1976D2" }}
                  onClick={handlePreviousMonth}
                />
                {displayMonth()}
                <ArrowForwardIosIcon
                  style={{ fontSize: "25px", color: "#1976D2", marginLeft: "7px" }}
                  onClick={handleNextMonth}
                />
              </h1>
            </div>
            <div style={{ marginBottom: "5px", marginTop: "-80px",display:'flex',flexDirection:'row'}}>
                <div >
                <ModalTransaction style={true} tipo={"RECEITA"} onAdicionarTransacao={adicionarTransacao} accounts={accountsData} categorys={CategoryData}></ModalTransaction>
                </div>
                <div style={{marginLeft:'10px'}}>
                <ModalTransaction style={true} tipo={"DESPESA"} onAdicionarTransacao={adicionarTransacao} accounts={accountsData} categorys={CategoryData}></ModalTransaction>
                </div>
            </div>
            <Grid style={{ maxWidth: "100%", width: "100%", margin: "auto 1px" }}>
                {Object.keys( TransacoesPorDia && TransacoesPorDia).map((dia) => (
                    <ModalPaiListTransa
                      day={dia}
                      accountsData={accountsData}
                      transactions={TransacoesPorDia[dia]}
                      isPagaTransacao={isPagaTransacao}
                      categoryList={CategoryData}
                      onAtualizarTrasacao={atualizarTransacao}
                      onRemoverTransacao={removerTransacao}
                    />
                  ))}
            </Grid>
            <Grid
      container
      style={{
        maxWidth: '100%',
        width: '100%',
        margin: 'auto 1px',
        display: 'flex',
        justifyContent: 'space-between', 
        flexDirection: 'row-reverse', 
      }}
    >

      <Grid style={{ width: '400px', height: '150px' }}>
        <Grid>
          <Grid style={{ ...styleFontRelatorio, marginTop: '15px' }}>
            Receita mensal: {retornaValor(obterReceitaMensal())}
          </Grid>
          <Grid style={{ ...styleFontRelatorio, marginTop: '15px' }}>
            Despesa Mensal: {retornaValor(obterDespesaMensal())}
          </Grid>
          <Grid style={{ ...styleFontRelatorio, marginTop: '20px' }}>
            Saldo Total : {(obterReceitaMensal()) + (obterDespesaMensal()) < 0 ?
              <h4 style={{ color: 'red', display: 'inline' }}>{retornaValor((obterReceitaMensal()) + (obterDespesaMensal()))}</h4> :
              <h4 style={{ color: 'green', display: 'inline' }}>{retornaValor((obterReceitaMensal()) + (obterDespesaMensal()))}</h4>
            }
          </Grid>
        </Grid>
      </Grid>


      <Grid>
        <Button variant="contained" style={{ fontSize:  '1rem', padding: '15px',marginTop:'40px',marginLeft:'15px' }} onClick={handleGerarPDF}>Gerar relatorio</Button>
        {showRelatorio && <RelatorioPDF transacaoData={transacaoParaRelatorioNotEffect && transacaoParaRelatorioNotEffect} />}
      </Grid>
    </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
};

export default Lancamentos;

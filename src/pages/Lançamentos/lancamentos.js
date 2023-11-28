import React, { useEffect,useState } from "react";
import NavBar from "../../components/navbar";
import axios from "axios";
import { Paper, Grid, Container , Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalEditTransa from "../../components/modaltransacaoedit";

const URL = "http://localhost:8080/api/"

const paperStyle = {
    padding: '10px',
    minHeight: '1100px',
    maxWidth: '1200px',
    margin: '20px auto',
    borderRadius: '10px'
};
const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
};



const Lancamentos =() =>{

    // Coisas relacionadas a requisicoes 30-79
    const token = localStorage.getItem('user');
    const idUser = localStorage.getItem('userId')
    const [transactionData, setTransaction] = useState([])

    useEffect(()=>{
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
                    dataAtual.getDate() > dataDaTransacao.getDate()
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
          }

          obterTransacoes()
        

    },[idUser,token])
    



    //SELEC DATA E FORMAT DATA PARA TELA 84-120
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 11) {
                // Se o próximo mês for janeiro, incrementa o ano também
                setCurrentYear((prevYear) => prevYear + 1);
            }
            return (prevMonth + 1) % 12;
        });
    };
    
    const handlePreviousMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 0) {
                // Se o mês anterior for dezembro, decrementa o ano também
                setCurrentYear((prevYear) => prevYear - 1);
            }
            return (prevMonth - 1 + 12) % 12;
        });
    };

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro",
        "Novembro", "Dezembro"
    ];

    const displayMonth = () => {
        return `${monthNames[currentMonth]} ${currentYear}`;
    };

    //ABRIR MODAL E FECHAR MODAL 120-130
    const [openModal, setOpenModal] = useState(false);

    const handleClickOpen = () => {
      setOpenModal(true);
    };
  
    const handleClose = () => {
      setOpenModal(false);
    };

    const removerTransacao = (transacaoId) => {
        setTransaction((prevTransactions) =>
          prevTransactions.filter((transacao) => transacao.id !== transacaoId)
        );
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

    
    return (
        <Grid>
            <NavBar />
            <Container>
                <Paper elevation={10} style={paperStyle}>
                    <Grid container direction="column" spacing={2}>
                        <div style={headerStyle}>
                            <ArrowBackIosIcon style={{fontSize: '32px',marginLeft: '415px',color:'#1976D2'}} onClick={handlePreviousMonth} />
                            <h1>{displayMonth()}</h1>
                            <ArrowForwardIosIcon style={{fontSize: '32px',marginRight: '415px',color:'#1976D2'}} onClick={handleNextMonth}/>
                        </div>
                        <div>
                        <AddCircleIcon onClick={handleClickOpen} style={{fontSize:'55px',marginLeft: '20px',color:'#1976D2',marginTop:'-200px'}}></AddCircleIcon>
                        </div>
                        <ModalEditTransa onRemoverTransacao={removerTransacao} open={openModal} dados={transactionData} onClose={handleClose} onAtualizarTrasacao={atualizarTransacao}></ModalEditTransa>
                    </Grid>
                </Paper>
            </Container>
        </Grid>
    );
};

export default Lancamentos;

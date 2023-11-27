import React,{useState} from 'react';
import { Paper, Grid, Container,Button } from '@mui/material';
import ModalTransaction from './modalTransaction';


// Estilos
const paperStyle = {
    padding: '10px',
    minHeight: '250px',
    maxWidth: '1200px',
    margin: '20px auto',
    borderRadius: '10px'
};

const saudacaoStyle = { fontSize: '25px', marginBottom: "30px", marginLeft: "15px" };

const wrapperStyle = {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: "left",
    margin: "0px 30px",
    gap: '20px'
};

const itemStyle = {
    flex: 1,
    borderRadius: '5px',
    textAlign: "center",
};

function saudacao(user) {
    const agora = new Date();
    const hora = agora.getHours();

    if (hora >= 5 && hora < 12) { 
        return 'Bom dia!  '+ user+  ' ☀️';
    } else if (hora >= 12 && hora < 18) {
        return 'Boa tarde!   '+ user+ ' 🌓';
    } else {
        return 'Boa noite!   '+ user+ ' 🌙';
    }
}
const btnStyleReceita = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }
const btnStyleDespesa = { backgroundColor: '#f44336', fontSize: '14px', padding: '10px 20px' }
const AcessoRapido = ({ accounts, category, onAdicionarTransacao, transacitons, userName }) => {


    return (
        <Container>
            <Paper elevation={10} style={paperStyle}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <h2 style={saudacaoStyle}>{saudacao(userName && userName.name)}</h2>
                    </Grid>
                    <Grid id="values">
                        <div style={wrapperStyle}>
                            <Paper elevation={5} style={itemStyle}>
                                <h3>Receita mensal</h3>
                                <p>{(transacitons && transacitons
                                    .filter(transacao => transacao.type === 'RECEITA')
                                    .reduce((soma, transacao) => soma + transacao.valor, 0)
                                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })) || Number('0').toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                                </p>
                            </Paper>

                            <Paper elevation={5} style={itemStyle}>
                                <h3>Despesa mensal</h3>
                                <p>
                                {(transacitons && transacitons
                                    .filter(transacao => transacao.type === 'DESPESA')
                                    .reduce((soma, transacao) => soma + transacao.valor, 0)
                                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })) || Number('0').toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                                </p>
                            </Paper>
                        </div>
                    </Grid>

                    <Grid>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>          
                        <ModalTransaction tipo={"RECEITA"} onAdicionarTransacao={onAdicionarTransacao} accounts={accounts} categorys={category}></ModalTransaction>
                        <ModalTransaction tipo={"DESPESA"} onAdicionarTransacao={onAdicionarTransacao} accounts={accounts} categorys={category}></ModalTransaction>
                    </div>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default AcessoRapido;

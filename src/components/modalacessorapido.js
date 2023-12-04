import React, { useState } from 'react';
import { Paper, Grid, Container, Button } from '@mui/material';
import ModalTransaction from './modalTransaction';
import { useEffect } from 'react';


// Estilos
const paperStyle = {
    padding: '10px',
    minHeight: '250px',
    maxWidth: '1200px',
    margin: '20px auto',
    borderRadius: '10px'

};

const saudacaoStyle = { fontSize: '25px', marginLeft: '10px', marginBottom: '40px' };


const wrapperStyle = {
    display: 'flex',
    flexDirection: 'row',
    margin: "0px 20px",
    gap: '25px',
    marginBottom: '10px',
    alignContent: 'flex-start'
};

const wrapperStyleSaldo = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '15px'
};

const allStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '40px',
    justifyContent: 'center'
}

const itemStyle = {
    display: 'flex',
    padding: '5px',
    borderRadius: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxHeight: '70px',
    minWidth: '220px',
    width: 'fit-content',
    maxWidth: '300px'
};

const saldoStyle = {
    display: 'flex',
    padding: '5px',
    borderRadius: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxHeight: '70px',
    minWidth: '220px',
    width: 'fit-content',
    maxWidth: '300px'
}


function saudacao(user) {
    const agora = new Date();
    const hora = agora.getHours();

    if (hora >= 5 && hora < 12) {
        return 'Bom dia ' + user + '! ☀️';
    } else if (hora >= 12 && hora < 18) {
        return 'Boa tarde ' + user + '! 🌓';
    } else {
        return 'Boa noite ' + user + '! 🌙';
    }
}
const btnStyleReceita = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }
const btnStyleDespesa = { backgroundColor: '#f44336', fontSize: '14px', padding: '10px 20px' }



const AcessoRapido = ({ accounts, category, onAdicionarTransacao, transacitons, userName, saldoTotal }) => {


    return (
        <Container>
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                    <h2 style={saudacaoStyle}>{saudacao(userName && userName.name)}</h2>
                </Grid>

                <Grid spacing={2}>
                    <Grid style={allStyle}>
                        <div style={wrapperStyle}>
                            <Paper elevation={5} style={itemStyle}>
                                <h3 style={{ fontSize: '17px', margin: '5px' }}>A receber</h3>
                                <p style={{ color: 'green', fontSize: '21px', fontWeight: 'bolder', margin: '5px' }}>
                                    {(transacitons && transacitons
                                        .filter(transacao => transacao.type === 'RECEITA')
                                        .reduce((soma, transacao) => soma + transacao.valor, 0)
                                        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })) || Number('0').toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </Paper>

                            <Paper elevation={5} style={itemStyle}>
                                <h3 style={{ fontSize: '17px', margin: '5px' }}>A pagar</h3>

                                <p style={{ color: 'red', fontSize: '21px', fontWeight: 'bolder', margin: '5px' }}>
                                    {(transacitons && transacitons
                                        .filter(transacao => transacao.type === 'DESPESA')
                                        .reduce((soma, transacao) => soma + transacao.valor, 0)
                                        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })) || Number('0').toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </Paper>

                            <Paper elevation={5} style={saldoStyle}>
                                <h3 style={{ fontSize: '17px', margin: '5px' }}>Saldo Atual</h3>

                                <p style={{ color: 'black', fontSize: '21px', fontWeight: 'bolder', margin: '5px' }}>
                                    {saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>

                            </Paper>
                        </div>
                    </Grid>
                    <Grid style={wrapperStyleSaldo}>
                        <ModalTransaction tipo={"RECEITA"} onAdicionarTransacao={onAdicionarTransacao} accounts={accounts} categorys={category}></ModalTransaction>
                        <ModalTransaction tipo={"DESPESA"} onAdicionarTransacao={onAdicionarTransacao} accounts={accounts} categorys={category}></ModalTransaction>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default AcessoRapido;

import React from 'react';
import { Paper, Grid, Container } from '@mui/material';
import ModalTransaction from './modalTransaction.js';

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

function saudacao() {
    const agora = new Date();
    const hora = agora.getHours();

    if (hora >= 5 && hora < 12) {
        return 'Bom dia! ☀️';
    } else if (hora >= 12 && hora < 18) {
        return 'Boa tarde! 🌓';
    } else {
        return 'Boa noite! 🌙';
    }
}

const AcessoRapido = ({ accounts, category, onAdicionarTransacao }) => {
    return (
        <Container>
            <Paper elevation={10} style={paperStyle}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <h2 style={saudacaoStyle}>{saudacao()}</h2>
                    </Grid>

                    <Grid id="values">
                        <div style={wrapperStyle}>
                            <Paper elevation={5} style={itemStyle}>
                                <h3>Receita mensal</h3>
                                <p>R${}</p>
                            </Paper>

                            <Paper elevation={5} style={itemStyle}>
                                <h3>Despesa mensal</h3>
                                <p>R${}</p>
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

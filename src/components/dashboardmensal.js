import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Paper, Container, Typography, Grid } from '@mui/material';

// Estilos
const paperStyle = {
  margin: '0px',
  padding: '20px',
  minHeight: '15vh',
  minWidth: '500px',
  maxWidth: '500px',
  borderRadius: '10px',
  textAlign: 'center',
};

const labelStyle = {
  marginTop: '10px', // Ajuste a margem superior para separar a label do gráfico
};

const DashBoardGastosMensais = ({ gastosMensais, categories }) => {


  const dataAtual = new Date();
  const transacoesDoMeDashBoard = gastosMensais.filter(transacao => {
    const partesData = transacao.creationDate.split('/');
    const dataDaTransacao = converterStringParaData(transacao.creationDate);

    return (
      dataDaTransacao.getFullYear() === dataAtual.getFullYear() &&
      dataDaTransacao.getMonth() === dataAtual.getMonth()

    );
  });



  const total = transacoesDoMeDashBoard.reduce((acc, gasto) => acc + gasto.valor, 0);

  const formatChartData = () => {
    const consolidatedData = {};

    transacoesDoMeDashBoard.forEach((gasto) => {
      const category = categories && categories.find((c) => c.id === gasto.idCategory);

      if (category) {
        const percentage = (gasto.valor / total) * 100;

        if (consolidatedData[category.id]) {
          consolidatedData[category.id].value += percentage;
        } else {
          consolidatedData[category.id] = {
            id: category.id,
            value: percentage,
            label: category.nome,
          };
        }
      }
    });

    return Object.values(consolidatedData);
  };

  return (
    <Container>
      <Paper elevation={10} style={paperStyle}>
        <h2>Maiores gastos do mês atual</h2>
        <Grid container justifyContent="center" alignItems="center">
          {transacoesDoMeDashBoard.length > 0 ? (
            <>
              <div style={labelStyle}>
                <Typography variant="body2"></Typography>
              </div>
              <PieChart
                series={[
                  {
                    data: formatChartData(),
                  },
                ]}
                width={600}
                height={250}
                label={({ dataEntry }) => dataEntry.label} 
                labelPosition={105}
              />
            </>
          ) : (
            <Typography variant="body2" textAlign='center' marginTop='10px' fontSize='16px'>
              Você não possui <span style={{ fontWeight: 'bolder' }}>gastos</span>!
            </Typography>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default DashBoardGastosMensais;

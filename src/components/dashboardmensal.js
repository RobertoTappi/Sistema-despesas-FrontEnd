import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Paper, Container, Typography, Grid } from '@mui/material';

// Estilos
const paperStyle = {
  padding: '20px',
  minHeight: '300px',
  maxWidth: '500px',
  margin: '20px 0px auto',
  borderRadius: '10px',
  textAlign: 'center', 
};

const DashBoardGastosMensais = ({ gastosMensais, categories }) => {
  console.log("Dashboard", gastosMensais);

  const formatChartData = () => {
    const consolidatedData = {};

    const total = gastosMensais.reduce((acc, gasto) => acc + gasto.valor, 0);
    gastosMensais.forEach((gasto) => {
      const category = categories.find((c) => c.id === gasto.idCategory);

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
        <Typography variant="h6">Maiores gastos do mês atual</Typography>
        <Grid container justifyContent="center" alignItems="center">
          <PieChart
            series={[
              {
                data: formatChartData(),
              },
            ]}
            width={400}
            height={200}
          />
        </Grid>
      </Paper>
    </Container>
  );
};

export default DashBoardGastosMensais;

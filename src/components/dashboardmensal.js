import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Paper, Container, Typography, Grid } from '@mui/material';

// Estilos
const paperStyle = {
  padding: '20px',
  minHeight: '300px',
  maxWidth: '500px',
  margin: '20px 0px auto', // Removendo a margem superior e inferior
  borderRadius: '10px',
  textAlign: 'center', 
};

const labelStyle = {
  marginTop: '10px', // Ajuste a margem superior para separar a label do gráfico
};

const DashBoardGastosMensais = ({ gastosMensais, categories }) => {
  console.log("Dashboard", gastosMensais);

  const formatChartData = () => {
    const consolidatedData = {};

    gastosMensais.forEach((gasto) => {
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

  const total = gastosMensais.reduce((acc, gasto) => acc + gasto.valor, 0);

  return (
    <Container>
      <Paper elevation={10} style={paperStyle}>
        <Typography variant="h6">Maiores gastos do mês atual</Typography>
        <Grid container justifyContent="center" alignItems="center">
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
            label={({ dataEntry }) => dataEntry.label} // Personaliza a posição do rótulo
            labelPosition={65} // Ajuste a posição da label para ficar abaixo do gráfico
          />
        </Grid>
      </Paper>
    </Container>
  );
};

export default DashBoardGastosMensais;

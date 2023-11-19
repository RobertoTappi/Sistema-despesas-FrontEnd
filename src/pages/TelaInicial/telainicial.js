import * as React from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../components/navbar';
import ModalDespesa from '../../components/modal';
import ModalReceita from '../../components/modal2'


const Principal = () => {
   return (
    <Grid>
        <NavBar></NavBar>
        <ModalReceita></ModalReceita>
        <ModalDespesa></ModalDespesa>
    </Grid>
   )
}
export default Principal;

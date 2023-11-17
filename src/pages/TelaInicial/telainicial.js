import * as React from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../components/navbar';
import BasicModal from '../../components/modal';


const Principal = () => {
   return (
    <Grid>
        <NavBar></NavBar>
        <BasicModal></BasicModal>
    </Grid>
   )
}
export default Principal;

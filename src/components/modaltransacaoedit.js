import React,{useEffect, useState} from 'react';
import {Dialog,Button, DialogContent,Typography, FormLabel,FormControl,RadioGroup,FormControlLabel,Radio,Grid, TextField} from '@mui/material';
import { CurrencyInput } from 'react-currency-mask';

function retornaValor(dados){
    if(dados && dados !=null && dados!=undefined){
        return dados.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
}

const btnStyleSalvar = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }
const btnStyleFechar = { backgroundColor: '#f44336', fontSize: '14px', padding: '10px 20px' }

const ModalEditTransa = ({open,dados, onClose , tipo}) =>{

    const [openModal, setOpenModal] = useState(false);
    const [amount, setAmount] = useState(null)
    useEffect(() => {
        
        setOpenModal(open);
        setAmount(dados.valor)
      }, [open]);

    const handleClose = () => {
        onClose();
      };

    const handleSave = () => {

    }



    return(

    <Dialog open={openModal} onClose={handleClose} fullWidth  maxWidth="sm">
        <Grid>

        <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label"><h4>Adicionar</h4></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="rEC" control={<Radio />} label="Receita" />
          <FormControlLabel value="male" control={<Radio />} label="Despesa" />
        </RadioGroup>
        </FormControl>

        </Grid>


        <DialogContent>
            <Grid>
            <TextField variant="outlined" type="text" label="Descrição" value={dados && dados.descricao}></TextField>
            </Grid>
            <Grid>
                <CurrencyInput
                    value={amount}
                    onChangeValue={(event, originalValue, maskedValue) => {
                        setAmount(originalValue)
                    }}
                    InputElement={<TextField variant="outlined" type="text" label="Valor"></TextField>}
                />
                <TextField variant="outlined" type="text" label="Data">{dados.creationDate}</TextField>
            </Grid>

            <Button onClick={handleSave} color="primary" variant="contained" style={btnStyleSalvar} >Salvar</Button>
            <Button onClick={handleClose} color="primary" variant="contained" style={btnStyleFechar}>Fechar</Button>
        </DialogContent>
    </Dialog>
    );


};
export default ModalEditTransa;
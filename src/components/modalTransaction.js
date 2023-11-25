import { useState } from "react";
import { Button, Dialog, Grid, DialogContent, InputAdornment, Stack, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import SelectCategory from "./selectcategory";
import { TransactionAXIOS } from '../services/enviarTransacao';


// Estilos

const btnStyle = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }

function commaToDot(value) {
    if (value.includes(',')) {
        return value.replace(',', '.');
    }
    return value;
}


const ModalTransaction =({ tipo,accounts,onAdicionarTransacao  }) =>{
    const [open, openchange] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const typeTransaction = tipo
    const [selectedAccount, setSelectedAccount] = useState('');

    const idUser = localStorage.getItem('userId');
    const token = localStorage.getItem('user');

    let btnStyle;
    if(tipo === "RECEITA"){
        btnStyle = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }
    }else{
        btnStyle = { backgroundColor: '#f44336', fontSize: '14px', padding: '10px 20px' }
    }

    const functionopenpopup = () => {
        openchange(true);
    };

    const closepopup = () => {
        openchange(false);
    };

    const formatDate = (e) => {
        const formattedDate = dayjs(e.target.value).format('DD/MM/YYYY');
        setSelectedDate(formattedDate);
    }

    const handleAmountChange = (e) => {
        const inputValue = e.target.value;
        const valorTratado = commaToDot(inputValue);
        setAmount(valorTratado);
    };


    const handleChange = (event) => {
        setSelectedAccount(event.target.value);
    };

     function handleTransaction() {
        cadastrarTransacao();
        closepopup();
    };


    async function cadastrarTransacao(){
        const amountToSend = parseFloat(amount).toFixed(2);
        const response =TransactionAXIOS(idUser, amountToSend, description, selectedDate, typeTransaction, selectedAccount,token)
        //await onAdicionarTransacao(response.data)
    }


    return (
        <div style={{ margin: '10px' }}>
            <Button onClick={functionopenpopup} color="primary" variant="contained" style={btnStyle}>
                Adicionar {tipo === "RECEITA" ? "Receita" : "Despesa"}
            </Button>
            <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            variant="outlined"
                            type="text"
                            label="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            label="Valor ($)"
                            type="number"
                            step="0.01"
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                            value={amount}
                            onChange={handleAmountChange}
                        />

                        <TextField
                            variant="outlined"
                            type="date"
                            label="Data"
                            defaultValue={selectedDate}
                            InputLabelProps={{ shrink: true }}
                            onChange={formatDate}
                        />

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ maxWidth: 230 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Conta</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedAccount}
                                            label="Conta"
                                            onChange={handleChange}
                                        >

                                            {accounts && accounts.map((account) => (
                                                <MenuItem key={account.id} value={account.id}>
                                                    {account.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCategory />
                            </Grid>
                        </Grid>

                        <Button color="primary" variant="contained" onClick={handleTransaction}>
                            Criar {tipo === "RECEITA" ? "Receita" : "Despesa"}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ModalTransaction; 
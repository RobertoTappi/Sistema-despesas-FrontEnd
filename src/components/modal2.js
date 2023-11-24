import { useState } from "react";
import { Button, Dialog, Grid, DialogContent, Stack, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SelectCategory from "./selectcategory";
import { TransactionAXIOS } from '../services/enviarTransacao';
import { mask } from 'remask'


// Estilos

const btnStyle = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }


function Modal2popup({ accounts, categorys }) {
    const [open, openchange] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const typeTransaction = "RECEITA"
    const [selectedAccount, setSelectedAccount] = useState('');

    const idUser = localStorage.getItem('userId');


    const functionopenpopup = () => {
        openchange(true);
    };

    const closepopup = () => {
        openchange(false);
    };

    const handleDate = (e) => {
        const value = e.target.value
        const pattern = ['99/99/9999']
        setSelectedDate(mask(value, pattern));
    }

    const handleAmountChange = (e) => {
        const inputValue = e.target.value

        setAmount(inputValue)
    };

    const handleChange = (event) => {
        setSelectedAccount(event.target.value);
    };

    async function handleTransaction() {
        const amountToSend = parseFloat(amount).toFixed(2);

        const response = await TransactionAXIOS(idUser, amountToSend, description, selectedDate, typeTransaction, selectedAccount)

        console.log(response)
        closepopup();
    };


    return (
        <div style={{ margin: '10px' }}>
            <Button onClick={functionopenpopup} color="primary" variant="contained" style={btnStyle}>
                Adicionar receita
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
                            label="Valor (R$)"
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                        />

                        <TextField
                            variant="outlined"
                            type="text"
                            label="Data"
                            placeholder="dd/mm/yyyy"
                            value={selectedDate}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleDate}
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
                            Criar receita
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Modal2popup; 
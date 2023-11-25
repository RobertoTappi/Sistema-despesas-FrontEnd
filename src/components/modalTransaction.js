import React, { useState } from "react";
import { Button, Dialog, Grid, DialogContent, Stack, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { TransactionAXIOS } from '../services/enviarTransacao';
import { mask } from 'remask'
import { useMemo } from "react";


// Estilos

const btnStyle = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }


const ModalTransaction = ({ tipo, accounts, onAdicionarTransacao, categorys }) => {

    const [open, openchange] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const typeTransaction = tipo
    const [selectedAccount, setSelectedAccount] = useState('');
    const [category, setCategory] = useState('');

    const idUser = localStorage.getItem('userId');
    const token = localStorage.getItem('user');

    let btnStyle;
    if (tipo === "RECEITA") {
        btnStyle = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }
    } else {
        btnStyle = { backgroundColor: '#f44336', fontSize: '14px', padding: '10px 20px' }
    }

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

    const filteredDespesaCategorys = useMemo(() => {
        return categorys ? categorys.filter(category => category.tipo === 'DESPESA') : [];
    }, [categorys]);

    const filteredReceitaCategorys = useMemo(() => {
        return categorys ? categorys.filter(category => category.tipo === 'RECEITA') : [];
    }, [categorys]);

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    function handleTransaction() {
        cadastrarTransacao();
        closepopup();
    };


    async function cadastrarTransacao() {
        const amountToSend = parseFloat(amount).toFixed(2);

        TransactionAXIOS(idUser, amountToSend, category, description, selectedDate, typeTransaction, selectedAccount, token)
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
                                                <MenuItem value={account.id}>
                                                    {account.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ maxWidth: 230 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            label="Categoria"
                                            onChange={handleChangeCategory}
                                        >
                                            {tipo === 'RECEITA' ? (
                                                filteredReceitaCategorys.map((category) => (
                                                    <MenuItem value={category.id} key={category.id}>
                                                        {category.nome}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                filteredDespesaCategorys.map((category) => (
                                                    <MenuItem value={category.id} key={category.id}>
                                                        {category.nome}
                                                    </MenuItem>
                                                ))
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
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


import React, { useEffect, useState,useRef } from "react";
import { Button,IconButton,FormControlLabel,Checkbox,Typography, Dialog, Grid, DialogContent, Stack, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { TransactionAXIOS } from '../services/enviarTransacao';
import { mask } from 'remask'
import { useMemo } from "react";
import { CurrencyInput } from 'react-currency-mask';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ModalTransaction = ({ tipo, accounts, onAdicionarTransacao, categorys }) => {


    const [open, openchange] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('pt-BR'));
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

    useEffect(() => {
        if (accounts) {
            const contaEncontrada = accounts.find(account => account.name === 'Conta Principal') || null
            if (contaEncontrada) {
                setSelectedAccount(contaEncontrada.id)
            }
        }
    })

    function retornaValor(dados){
        if(dados && dados !=null && dados!=undefined){
            return dados.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
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

    const textFieldDescRef = useRef(null);
    const textFieldValorRef = useRef(null);
    const textFieldDataRef = useRef(null);
    const [msgAJudaDesc, setMsgAjudaD] = useState('')
    const [msgAJudaValor, setMsgAjudaV] = useState('')
    const [msgAJudaData, setMsgAudaAjudaDa] = useState('')
    const [errorDesc, setErrorDesc] = useState(false)
    const [errorValor, setErrorValor] = useState(false)
    const [errorData, setErrorData] = useState(false)

    function handleTransaction() {
        if (validarForm()) {
            cadastrarTransacao();
            //Limpando valores
            setSelectedDate(null)
            setAmount(null)
            setDescription(null)
            //fechando
            closepopup();
        }
    };

    const validarForm = () => {
        if (description === null || description.length < 1) {
            setMsgAjudaD("Descrição não pode ser nula")
            setErrorDesc(true)
            textFieldDescRef.current.focus()
        } else if (selectedDate.length !== 10) {
            setMsgAjudaD("")
            setErrorDesc(false)
            setMsgAudaAjudaDa("Data inválida")
            setErrorData(true)
            textFieldDataRef.current.focus()
        } else if (amount === 0) {
            setMsgAudaAjudaDa("")
            setErrorData(false)
            setMsgAjudaD("")
            setErrorDesc(false)
            setMsgAjudaV("Valor não pode ser 0 ou nulo")
            setErrorValor(true)
            textFieldValorRef.current.focus()
        } else {
            setMsgAjudaV("")
            setErrorValor(false)
            return true
        }
    }

    async function cadastrarTransacao() {
        console.error("erro ao cadastrar transação fora");
        try {
            const response = await TransactionAXIOS(idUser, amount,category, description, selectedDate, typeTransaction, selectedAccount,showParcelasSelect,selectedParcela, token);

            onAdicionarTransacao(response.data);

        } catch (error) {
            console.error("erro ao cadastrar transação", error);
        }
    }

    const [showParcelasSelect, setShowParcelasSelect] = useState(false);
    const [selectedParcela, setSelectedParcela] = useState(2);
  
    const handleCheckboxChange = () => {
      setShowParcelasSelect(!showParcelasSelect);
    };
  
    const handleParcelaChange = (event) => {
      setSelectedParcela(event.target.value);
    };


    return (
        <div style={{ margin: '10px' }}>
            <Button onClick={functionopenpopup} color="primary" variant="contained" style={btnStyle}>
                Adicionar {tipo === "RECEITA" ? "Receita" : "Despesa"}
            </Button>
            <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <IconButton onClick={closepopup} style={{ position: 'absolute', top: 0, left: 0, color: '#000' }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h5" align="center" gutterBottom>
                            Adicionar {tipo === "RECEITA" ? "Receita" : "Despesa"}
                        </Typography>

                        <TextField
                            inputRef={textFieldDescRef}
                            error={errorDesc}
                            helperText={msgAJudaDesc}
                            variant="outlined"
                            type="text"
                            label="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <CurrencyInput
                                    onChangeValue={(event, originalValue, maskedValue) => setAmount(originalValue)}
                                    InputElement={<TextField inputRef={textFieldValorRef} error={errorValor}
                                        helperText={msgAJudaValor} variant="outlined" type="text" label="Valor" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errorData}
                                    helperText={msgAJudaData}
                                    inputRef={textFieldDataRef}
                                    variant="outlined"
                                    type="text"
                                    label="Data"
                                    placeholder="dd/mm/yyyy"
                                    value={selectedDate}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleDate}
                                />
                            </Grid>
                        </Grid>

                <Grid container spacing={2}>
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
                            <MenuItem value={account.id} key={account.id}>
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
                <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                    sx={{ maxWidth: 120 }}
                    value="start"
                    control={<Checkbox
                        checked={showParcelasSelect}
                        onChange={handleCheckboxChange}
                        inputProps={{ 'aria-label': 'controlled' }} />}
                    label="Parcelado?"
                    labelPlacement="start"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
                {showParcelasSelect && (
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="parcela-select-label">Parcelas</InputLabel>
                            <Select
                                labelId="parcela-select-label"
                                id="parcela-select"
                                value={selectedParcela}
                                label="Parcelas"
                                onChange={handleParcelaChange}
                            >
                                {[ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((parcela) => (
                                    <MenuItem value={parcela} key={parcela}>
                                        {parcela}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography>{`${selectedParcela}x valor por parcela ${retornaValor(amount/selectedParcela)}`}</Typography>
                    </div>
                )}
            </Grid>
        </Grid>
                
                <Button onClick={handleTransaction} color="primary" variant="contained" style={btnStyle}>
                    Adicionar {tipo === 'RECEITA' ? 'Receita' : 'Despesa'}
                </Button>

            </Stack>
            </DialogContent>
        </Dialog>
        </div>
    );
}

export default ModalTransaction;


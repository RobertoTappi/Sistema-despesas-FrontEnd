import React,{useEffect, useState,useMemo} from 'react';
import {Dialog,Button,Checkbox,Typography, IconButton,MenuItem, FormLabel,FormControl,RadioGroup,FormControlLabel,Radio,Grid, TextField,Box,InputLabel,Select, DialogContent,} from '@mui/material';
import { CurrencyInput } from 'react-currency-mask';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { mask } from 'remask'
function retornaValor(dados){
    if(dados && dados !=null && dados!=undefined){
        return dados.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
}
const URL = "http://localhost:8080/api/"
const btnStyleSalvar = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }
const btnStyleFechar = { backgroundColor: '#f44336', fontSize: '14px', padding: '10px 20px' }

const ModalEditTransa = ({open,dados, onClose, onAtualizarTrasacao,onRemoverTransacao,}) =>{
    const token = localStorage.getItem('user');
    const idUser = localStorage.getItem('userId')
    const [openModal, setOpenModal] = useState(false);
    const [amount, setAmount] = useState(null)
    const [selectedDate, setSelectedDate] = useState('');
    const [type,setType] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idCategory, setIdCategory] = useState('');

    const [accountsData, setAccounts] = useState(null)
    const [categorysData, setCategory] = useState(null)

    const [selectedAccount, setSelectedAccount] = useState('');
    const [category, setCategoryUnico] = useState('');

    useEffect(() => {
      
        
        const obterAccounts = async () => {

          try {
            const response = await axios.get(URL + 'account/findAllAccounts/' + idUser, {
              headers: {
                Authorization: 'Bearer ' + token
              }
            });
            
            console.log("data accounts",{response})
            setAccounts(response.data);
            console.log(accountsData)
          } catch (error) {
            console.error('Erro ao buscar dados: accounts', error);
          }
      };

      const obterCategory = async () => {
          try {
            const response = await axios.get(URL + 'category/' + idUser, {
              headers: {
                Authorization: 'Bearer ' + token
              }
            });
            setCategory(response.data);
            console.log("category accounts category",{response})
    
          } catch (error) {
            console.error('Erro ao buscar dados:', error);
          }
        }


      obterCategory()
      obterAccounts()

      if (accountsData) {
          const contaEncontrada = accountsData.find(account => account.id === dados.idAccount);
          if (contaEncontrada) {
            setSelectedAccount(contaEncontrada);
          }
      }
      if(categorysData){
          const categoryEncontrada = categorysData.find(category => category.id === dados.idCategory);
          if(categoryEncontrada){
              setCategoryUnico(categoryEncontrada)
          }
      }   

      setOpenModal(open);
      setAmount(dados && dados.valor)
      setSelectedDate(dados &&dados.creationDate)

      setSelectedRadioValue(dados && dados.type)
      setFormLabelTitle(`Editar - ${dados && dados.type}`);
      setDescricao(dados &&dados.descricao)
      setIdCategory(dados &&dados.idCategory)
      
        
      

      }, [open]);

    const handleClose = () => {
        onClose();
      };

    const handleSave = () => {
        try{
            atualizarTransacao()
            onAtualizarTrasacao({
                creationDate: selectedDate,
                descricao: descricao,
                id: dados.id,
                idAccount: selectedAccount.id,
                idCategory: category ? category.id : null,
                type:selectedRadioValue,
                valor:   amount    
              });
              onClose();
        }catch(error){
            console.log(error)
        }
    }

    const handleDesc = (e) =>{
        setDescricao(e.target.value)
    }

    const handleChangeCategory = (event) => {
        const categoryEncontrada = categorysData.find(category => category.id === event.target.value);
        setCategoryUnico(categoryEncontrada)
    };
    const handleChange = (event) => {
        setSelectedAccount(event.target.value);
    };

    const filteredDespesaCategorys = useMemo(() => {
        return categorysData ? categorysData.filter(category => category.tipo === 'DESPESA') : [];
    }, [categorysData]);

    const filteredReceitaCategorys = useMemo(() => {
        return categorysData ? categorysData.filter(category => category.tipo === 'RECEITA') : [];
    }, [categorysData]);


    const [selectedRadioValue, setSelectedRadioValue] = useState('');
    const [formLabelTitle, setFormLabelTitle] = useState('Editar');
  
    const handleRadioChange = (event) => {
        if(selectedRadioValue !== event.target.value){
            setCategoryUnico(null)
        }
      const selectedValue = event.target.value;
        
      setSelectedRadioValue(selectedValue);
      setFormLabelTitle(`Editar - ${selectedValue}`);
    };

    const handleDate = (e) => {
        const value = e.target.value
        const pattern = ['99/99/9999']
        setSelectedDate(mask(value, pattern));
    }

    const atualizarTransacao = ()=>{
        const data= {
            idTransaction:dados.id,
            idUser: idUser,
            valor:amount,
            idCategory: category ? category.id : null,
            descricao: descricao,
            idAccount: selectedAccount.id,
            dataTransacao:selectedDate,
            tipoTransacao: selectedRadioValue,
            account:{
                id: selectedAccount.id,
            }
            
        }
        try {
            
            const response = axios.put(URL + 'transaction/alteraTransacao',data, {
              headers: {
                Authorization: 'Bearer ' + token
              }
            });
          } catch (error) {
            console.error('Erro ao buscar dados: accounts', error);
          }
    }

    const removerTransaction = () =>{
       
    try {
        axios.delete(`${URL}transaction/remTransacao/${dados.id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
        });
        }catch (error) {
            console.error('Erro ao remover ', error);
        }  
    }

    const onClickRemove = ()=>{
        removerTransaction()
        onRemoverTransacao(dados.id)
    }

    const [showParcelasSelect, setShowParcelasSelect] = useState(false);
    const [selectedParcela, setSelectedParcela] = useState(1);
  
    const handleCheckboxChange = () => {
      setShowParcelasSelect(!showParcelasSelect);
    };
  
    const handleParcelaChange = (event) => {
      setSelectedParcela(event.target.value);
    };
    
 


    return (
        <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm" padding="20px">
      <DialogContent style={{ padding: '20px', textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            <h4>{formLabelTitle}</h4>
          </FormLabel>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedRadioValue}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="RECEITA" control={<Radio />} label="Receita" />
                <FormControlLabel value="DESPESA" control={<Radio />} label="Despesa" />
              </RadioGroup>
            
        </FormControl>
        
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <TextField fullWidth variant="outlined" type="text" label="Descrição" value={descricao} onChange={handleDesc} />
            </Grid>
    
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CurrencyInput
                    value={amount}
                    onChangeValue={(event, originalValue, maskedValue) => {
                      setAmount(originalValue);
                    }}
                    InputElement={<TextField fullWidth variant="outlined" type="text" label="Valor" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Data"
                    placeholder="dd/mm/yyyy"
                    value={selectedDate}
                    onChange={handleDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
    
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Conta</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedAccount ? selectedAccount.id : ''}
                  label="Conta"
                  onChange={handleChange}
                >
                  {accountsData &&
                    accountsData.map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
    
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category ? category.id : ''}
                  label="Categoria"
                  onChange={handleChangeCategory}
                >
                  {selectedRadioValue === 'RECEITA' ? (
                    filteredReceitaCategorys.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.nome}
                      </MenuItem>
                    ))
                  ) : (
                    filteredDespesaCategorys.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.nome}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
    
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button onClick={handleSave} color="primary" variant="contained" style={btnStyleSalvar}>
                    Salvar
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleClose} color="primary" variant="contained" style={btnStyleFechar}>
                    Fechar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
    
            
            <IconButton
              style={{ position: 'absolute', top: 0, right: 0, color: '#f44336' }}
              onClick={
                onClickRemove
              }
            >
              <DeleteIcon />
            </IconButton>
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
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((parcela) => (
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
        
      </DialogContent>

        </Dialog>
      );


};
export default ModalEditTransa;
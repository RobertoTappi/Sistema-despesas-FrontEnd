import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Dialog, Button, Checkbox, Typography, IconButton, MenuItem, FormLabel, FormControl, RadioGroup, FormControlLabel, Radio, Grid, TextField, Box, InputLabel, Select, DialogContent, } from '@mui/material';
import { CurrencyInput } from 'react-currency-mask';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { mask } from 'remask'
import { mapeamentoDeIconesDespesa } from '../util/mapCategorias';
import { TransactionAXIOS } from '../services/enviarTransacao';



const btnStyleSalvar = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }
const btnStyleFechar = { backgroundColor: '#f44336', fontSize: '14px', padding: '10px 20px' }

const URL = "http://localhost:8080/api/"



function retornaValor(dados) {
  if (dados && dados != null && dados != undefined) {
    return dados.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
}
 
const ModalEditTransa = ({ open, dados,  onClose, onAtualizarTrasacao, onRemoverTransacao, categorys,}) => {
  
  const [descricao, setDescricao] = useState('');
  const [amount, setAmount] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('pt-BR'));
  const [selectedAccount, setSelectedAccount] = useState('');
  const [category, setCategoryUnico] = useState('');

  const [accountsData, setAccounts] = useState(null)
  const [categorysData, setCategory] = useState(null)
  const [idCategory, setIdCategory] = useState('');


  const token = localStorage.getItem('user');
  const idUser = localStorage.getItem('userId')

  const [selectedRadioValue, setSelectedRadioValue] = useState('');
  const [formLabelTitle, setFormLabelTitle] = useState('Editar');
  const [showParcelasSelect, setShowParcelasSelect] = useState(false);
  const [selectedParcela, setSelectedParcela] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsResponse, categoryResponse] = await Promise.all([
          axios.get(URL + 'account/findAllAccounts/' + idUser, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }),
          axios.get(URL + 'category/' + idUser, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }),
        ]);
  
        setAccounts(accountsResponse.data);
        setCategory(categoryResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
      fetchData();
      atualizarDados()

  }, [idUser,token,open]);


  const atualizarDados = ()=>{
      setAmount(dados && dados.valor)
      setSelectedDate(dados && dados.creationDate)
    
      setSelectedRadioValue(dados && dados.type)
      setFormLabelTitle(`Editar - ${dados && dados.type}`);
      setCategoryUnico(idCategory)
      setDescricao(dados && dados.descricao)
      setIdCategory(dados && dados.idCategory)

      if (accountsData) {
        const contaEncontrada = accountsData.find(account => account.id === dados.idAccount);
        if (contaEncontrada) {
          setSelectedAccount(contaEncontrada.id);
        }
      }
      if (categorysData) {
        const categoryEncontrada = categorysData.find(category => category.id === dados.idCategory);
        if (categoryEncontrada) {
          setCategoryUnico(categoryEncontrada.id)
        }
      }
  }


  const handleClose = () => {
    setMsgAudaAjudaDa("")
    setErrorData(false)
    setMsgAjudaD("")
    setErrorDesc(false)
    setMsgAjudaV("")
    setErrorValor(false)
    setMsgAjudaAccount('')
    setErrorAccount(false)
    setMsgAjudaCategoria("")
    setErrorCategoria(false)
    setShowParcelasSelect(false)
    onClose();
  };

   const handleSave = async () => {
      if (validarForm()) {
          await atualizarTransacao()
          handleClose()
      }
    }
  


  const handleDesc = (e) => {
    setDescricao(e.target.value)
  }

  const handleChangeCategory = (event) => {
    const categoryEncontrada = categorysData.find(category => category.id === event.target.value);
    setCategoryUnico(categoryEncontrada.id)
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



  const handleRadioChange = (event) => {
    if (selectedRadioValue !== event.target.value) {
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

  const atualizarTransacao = async() => {
    const data = {
      idTransaction: dados.id,
      idUser: idUser,
      valor: amount,
      idCategory: category ? category : null,
      descricao: descricao,
      idAccount: selectedAccount,
      dataTransacao: selectedDate,
      tipoTransacao: selectedRadioValue,
      account: {
        id: selectedAccount,
      }
    }
    try {
      const response = await axios.put(URL + 'transaction/alteraTransacao', data, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }); 
  
      onAtualizarTrasacao(response.data);
      
    } catch (error) {
      console.error('Erro ao buscar dados: accounts', error);
    }
  }

  const removerTransaction = async () => {
    try {
      await axios.delete(`${URL}transaction/remTransacao/${dados.id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      
    } catch (error) {
      console.error('Erro ao remover ', error);
    }
    debugger
  }

   const onClickRemove = async () => {
     await removerTransaction()
    onRemoverTransacao(dados.id)
    onClose()
  }



  const renderIcon = (categoryId) => {
    const categoriaAssociada = categorys.find(categoria => categoria.id === categoryId);

    if (categoriaAssociada) {
      const iconeEncontrado = mapeamentoDeIconesDespesa.find(icone => icone.id === categoriaAssociada.idCon);

      if (iconeEncontrado) {
        return (
          <div style={{ fontSize: '1px', marginRight: '8px' }}>
            {iconeEncontrado.icone}
          </div>
        );
      }
    }

    return null;
  };

  const renderCategoryMenuItem = (category) => (
    <MenuItem value={category.id} key={category.id}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {renderIcon(category.id)}
        {category.nome}
      </div>
    </MenuItem>
  );

  const textFieldDescRef = useRef(null);
  const textFieldValorRef = useRef(null);
  const textFieldDataRef = useRef(null);
  const textFieldAccountRef = useRef(null)
  const textFieldCategoriaRef = useRef(null)

  const [msgAJudaDesc, setMsgAjudaD] = useState('')
  const [msgAJudaValor, setMsgAjudaV] = useState('')
  const [msgAJudaData, setMsgAudaAjudaDa] = useState('')
  const [msgAjudaAccount, setMsgAjudaAccount] = useState('')
  const [msgAjudaCategoria, setMsgAjudaCategoria] = useState('')

  const [errorDesc, setErrorDesc] = useState(false)
  const [errorValor, setErrorValor] = useState(false)
  const [errorData, setErrorData] = useState(false)
  const [errorAccount, setErrorAccount] = useState(false)
  const [errorCategoria, setErrorCategoria] = useState(false)

  function validarData(dataStr) {
      if(dataStr === undefined){
        return false
      }
    const partes = dataStr &&  dataStr.split('/');
    
    if (partes.length !== 3) {
        return false;
    }

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);

    const data = new Date(ano, mes, dia);

    return (
        data.getFullYear() === ano &&
        data.getMonth() === mes &&
        data.getDate() === dia
    );
}
  const validarForm = () => {
    if (!(descricao && descricao.trim().length > 0)) {
      setMsgAjudaD("Descrição não pode ser nula")
      setErrorDesc(true)
      textFieldDescRef.current.focus()
    } else if (!validarData(selectedDate && selectedDate)) {
      setMsgAjudaD("")
      setErrorDesc(false)
      setMsgAudaAjudaDa("Data inválida")
      setErrorData(true)
      textFieldDataRef.current.focus()
    } else if (amount === 0 || amount === '') {
      setMsgAudaAjudaDa("")
      setErrorData(false)
      setMsgAjudaD("")
      setErrorDesc(false)
      setMsgAjudaV("Valor não pode ser 0 ou nulo")
      setErrorValor(true)
      textFieldValorRef.current.focus()
    } else if (selectedAccount === '') {
      setMsgAudaAjudaDa("")
      setErrorData(false)
      setMsgAjudaD("")
      setErrorDesc(false)
      setMsgAjudaV("")
      setErrorValor(false)
      setMsgAjudaAccount('Selecione uma conta')
      setErrorAccount(true)
      textFieldAccountRef.current.focus()
    }else {
      setMsgAudaAjudaDa("")
      setErrorData(false)
      setMsgAjudaD("")
      setErrorDesc(false)
      setMsgAjudaV("")
      setErrorValor(false)
      setMsgAjudaAccount('')
      setErrorAccount(false)
      setMsgAjudaCategoria("")
      setErrorCategoria(false)
      return true
    }
  }



  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" padding="20px">
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
            <TextField
              inputRef={textFieldDescRef}
              error={errorDesc}
              helperText={msgAJudaDesc}
              fullWidth
              variant="outlined"
              type="text"
              label="Descrição"
              value={descricao}
              onChange={handleDesc} />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>

                <CurrencyInput
                  value={amount}
                  onChangeValue={(event, originalValue, maskedValue) => {
                    setAmount(originalValue);
                  }}
                  InputElement={
                    <TextField
                      inputRef={textFieldValorRef}
                      error={errorValor}
                      helperText={msgAJudaValor}
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Valor" />}
                />

              </Grid>

              <Grid item xs={6}>
                <TextField
                  error={errorData}
                  helperText={msgAJudaData}
                  inputRef={textFieldDataRef}
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
                error={errorAccount}
                helperText={msgAjudaAccount}
                inputRef={textFieldAccountRef}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedAccount}
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
                error={errorCategoria}
                helperText={msgAjudaCategoria}
                inputRef={textFieldCategoriaRef}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category ? category : ''}
                label="Categoria"
                onChange={handleChangeCategory}
              >
                {selectedRadioValue === 'RECEITA' ? (
                  filteredReceitaCategorys.map(renderCategoryMenuItem)
                ) : (
                  filteredDespesaCategorys.map(renderCategoryMenuItem)
                )}
              </Select>
            </FormControl>
          </Grid>
          {dados.idTransacaoPai  ? ( <div></div>

          ):(
            <IconButton
            style={{ position: 'absolute', top: 0, right: 0, color: '#f44336' }}
            onClick={onClickRemove}
          > <DeleteIcon />
          </IconButton>
          )}

        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center" style={{marginTop:'20px'}}>
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
      </DialogContent>
    </Dialog>
  );


};
export default ModalEditTransa;
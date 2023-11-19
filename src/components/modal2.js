import { useState } from "react";
import { Button, Dialog, Grid, DialogContent, DialogTitle, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import dayjs from "dayjs";
import BasicSelect from "./select";
import SelectCategory from "./selectcategory"

// Estilos

const btnStyle = { backgroundColor: '#04AA6D', fontSize: '14px', padding: '10px 23px' }
const selectStyle = { minWidth: '250px' }
const selectStyle2 = { minWidth: '250px', marginLeft: '40px' }


function Modal2popup() {
    const [open, openchange] = useState(false);

    const dateNow = dayjs().format('YYYY-MM-DD')

    const functionopenpopup = () => {
        openchange(true);
    }

    const closepopup = () => {
        openchange(false);
    }

    return (
        <div style={{ margin: '10px' }}>
            <Button onClick={functionopenpopup} color="primary" variant="contained" style={btnStyle}>Adicionar receita</Button>
            <Dialog
                open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogTitle>Nova receita
                    <IconButton onClick={closepopup} style={{ float: 'right' }}>
                        <CloseIcon color="primary"></CloseIcon>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField variant="outlined" type="text" label="Descrição"></TextField>

                        <TextField variant="outlined" label="Valor ($) " type="number" step="0.01"
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}>
                        </TextField>

                        <TextField variant="outlined" type="date" label="Data" defaultValue={dateNow} InputLabelProps={{ shrink: true }}></TextField>

                        <Grid container style={{ minWidth: '560px' }}>
                            <Grid style={selectStyle}>
                                <BasicSelect></BasicSelect>
                            </Grid>

                            <Grid style={selectStyle2}>
                                <SelectCategory></SelectCategory>
                            </Grid>
                        </Grid>

                        <Button color="primary" variant="contained">Criar receita</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Modal2popup;
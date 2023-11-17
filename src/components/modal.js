import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import dayjs from "dayjs";
import BasicSelect from "./select";


function Modalpopup() {
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
            <Button onClick={functionopenpopup} color="primary" variant="contained">Adicionar despesa</Button>
            <Dialog
                open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogTitle>Nova Despesa
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

                        <BasicSelect></BasicSelect>

                            <Button color="primary" variant="contained">Criar despesa</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Modalpopup;
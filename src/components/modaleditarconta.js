import React, { useState } from 'react';
import { Button, Dialog, DialogContent, TextField, Stack } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

const EditarConta = () => {
    const [open, setOpen] = useState(false);
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Aqui você pode fazer algo com os valores dos campos, por exemplo, enviar para o backend
        console.log('Field 1:', field1);
        console.log('Field 2:', field2);
        console.log('Field 3:', field3);

        // Feche o diálogo após salvar
        closeDialog();
    };

    return (
        <div>
            <Button onClick={openDialog}>
                <EditNoteIcon />
            </Button>
            <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            label="Campo 1"
                            variant="outlined"
                            value={field1}
                            onChange={(e) => setField1(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Campo 2"
                            variant="outlined"
                            value={field2}
                            onChange={(e) => setField2(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Campo 3"
                            variant="outlined"
                            value={field3}
                            onChange={(e) => setField3(e.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" onClick={handleSave}>
                            Salvar
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditarConta;

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <Box sx={{ maxWidth: 230 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Categoria"
                    onChange={handleChange}
                >
                    <MenuItem value={10}></MenuItem>
                    {/* <MenuItem value={20}></MenuItem>
                    <MenuItem value={30}></MenuItem> */}
                </Select>
            </FormControl>
        </Box>
    );
}
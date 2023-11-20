// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// export default function BasicSelect({ accounts }) {
//     const [account, setAccount] = React.useState('');
    
//     const handleChange = (event) => {
//         setAccount(event.target.value);
//         debugger
//     };

//     return (
//         <Box sx={{ maxWidth: 230 }}>
//             <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Conta</InputLabel>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={account}
//                     label="Conta"
//                     onChange={handleChange}
//                 >

//                     {accounts && accounts.map((account) => (
//                         <MenuItem key={account.id} value={account.id}>
//                             {account.name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         </Box>
//     );
// }
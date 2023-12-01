import React from "react";
import AttachMoney from '@mui/icons-material/AttachMoney';
import CreditCard from '@mui/icons-material/CreditCard';
import Payment from '@mui/icons-material/Payment';
import MoneyOff from '@mui/icons-material/MoneyOff';
import Receipt from '@mui/icons-material/Receipt';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import LocalAtm from '@mui/icons-material/LocalAtm';
import Euro from '@mui/icons-material/Euro';
import TrendingDown from '@mui/icons-material/TrendingDown';
import Money from '@mui/icons-material/Money';
import AccountBalance from '@mui/icons-material/AccountBalance';
import Kitchen from '@mui/icons-material/Kitchen';
import Commute from '@mui/icons-material/Commute';
import School from '@mui/icons-material/School';
import LocalGroceryStore from '@mui/icons-material/LocalGroceryStore';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import Fastfood from '@mui/icons-material/Fastfood';
import Pets from '@mui/icons-material/Pets';
import LocalHospital from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { Button, ListItemAvatar } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddchartIcon from '@mui/icons-material/Addchart';
import StarIcon from '@mui/icons-material/Star';
import AddHomeIcon from '@mui/icons-material/AddHome';
import PoolIcon from '@mui/icons-material/Pool';
import CheckroomIcon from '@mui/icons-material/Checkroom';

export const mapeamentoDeIconesDespesa = [
    { id: 1, icone: <AttachMoney /> },
    { id: 2, icone: <LocalCafeIcon /> },
    { id: 3, icone: <Fastfood /> },
    { id: 4, icone: <Pets /> },
    { id: 5, icone: <Receipt /> },
    { id: 6, icone: <AddHomeIcon /> },
    { id: 7, icone: <LocalHospital /> },
    { id: 8, icone: <RestaurantIcon /> },
    { id: 9, icone: <PoolIcon /> },
    { id: 10, icone: <Money /> },
    { id: 11, icone: <CheckroomIcon /> },
    { id: 12, icone: <Kitchen /> },
    { id: 13, icone: <Commute /> },
    { id: 14, icone: <School /> },
    { id: 15, icone: <LocalGroceryStore /> },
    { id: 16, icone: <ShoppingBasket /> },
    { id: 17, icone: <Payment /> },

    // RECEITA
    { id: 18, icone: <PaidIcon /> },
    { id: 19, icone: <MoreHorizIcon /> },
    { id: 20, icone: <AddchartIcon /> },
    { id: 21, icone: <StarIcon /> }
];


const IconeComponent = ({ iconId, onClick  }) => {

    const iconeEncontrado = mapeamentoDeIconesDespesa.find((icone) => icone.id === iconId)

    if (!iconeEncontrado) {
        return
    }

    return (
        <ListItemAvatar>
            <Button onClick={() => onClick(iconId)} style={{ padding: 0, color: 'black' }}>
                {iconeEncontrado.icone}
            </Button>
        </ListItemAvatar>
    );
}

export default IconeComponent;

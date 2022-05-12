import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import MobilePopperMenu from '@/components/Elements/Header/MobilePopperMenu';
import jwtDecode from 'jwt-decode';
import storage from '@/utils/storage';

export default function PlaceholderPage() {
  const decodeJWT = () => {
    const token = storage.getToken();
    const decoded = jwtDecode(token);
    console.log('decoded', decoded);

    const decodedHeader = jwtDecode(token, { header: true });
    console.log(decodedHeader);
  };

  return (
    <div>
      <Button sx={{ backgroundColor: 'red' }} onClick={() => decodeJWT()}>
        Test
      </Button>
    </div>
  );
}

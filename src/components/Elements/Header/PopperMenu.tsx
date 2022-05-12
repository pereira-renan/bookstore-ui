import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useRef, useState } from 'react';
import storage from '@/utils/storage';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loggoutUser } from '@/stores/reducer/authReducer';
import LogoutIcon from '@mui/icons-material/Logout';

const MenuItemList = styled(MenuItem)({
  color: 'black',
});

export default function PopperMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.authReducer);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    dispatch(loggoutUser());
    storage.clearToken();
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        sx={{ color: 'white' }}
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <AccountCircleIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'top-start' ? 'right bottom' : 'right top',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {auth ? (
                    <MenuItemList onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: '6px' }} />
                      Logout
                    </MenuItemList>
                  ) : (
                    <>
                      <Link component={RouterLink} to="/auth/login" underline="none">
                        <MenuItemList>Login</MenuItemList>
                      </Link>
                      <Link component={RouterLink} to="/auth/register" underline="none">
                        <MenuItemList>Register</MenuItemList>
                      </Link>
                      <Link component={RouterLink} to="/auth/forgotPassword" underline="none">
                        <MenuItemList>Forgot Password</MenuItemList>
                      </Link>
                    </>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

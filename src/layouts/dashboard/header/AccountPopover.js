import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// @mui
import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// mocks_
import account from '../../../_mock/account';
import removeCookie from "../../../Services/RemoveCookieService";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  
  const openProfilePage = () => {
    navigate('/dashboard/profile')
    setOpen(null);
  };

  const openDashboardPage = () => {
    navigate('/dashboard')
    setOpen(null);
  };

  const openSettingsPage = () => {
    navigate('/dashboard/settings')
    setOpen(null);
  };

  const logout = () => {
    removeCookie('jwt-token-cookie');
    removeCookie('account-details-cookie');
    removeCookie('email-cookie');
    
    setOpen(null);
    navigate('/login')
  };

  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: 'eva:home-fill',
      method: openDashboardPage,
    },
    {
      label: 'Profile',
      icon: 'eva:person-fill',
      method: openProfilePage,
    },
    {
      label: 'Settings',
      icon: 'eva:settings-2-fill',
      method: openSettingsPage,
    },
  ];

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={option.method}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}

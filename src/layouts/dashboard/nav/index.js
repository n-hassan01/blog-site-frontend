import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Avatar, Box, Drawer, Link, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// mock
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import NavSection from '../../../components/nav-section';
import Scrollbar from '../../../components/scrollbar';
//
import { getLoggedInUserDetails } from '../../../Services/ApiServices';
import navConfigAdmin from './adminConfig';
import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const usersDetails = await getLoggedInUserDetails();
        if (usersDetails) setLoggedInUser(usersDetails.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  console.log(loggedInUser);
  const selectedNav = loggedInUser.role === 1 ? navConfigAdmin : navConfig;

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }} />

      <Box sx={{ mb: 2, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={'/favicon/logo.png'} alt="logo" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Chowdhury's Blog
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={selectedNav} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ mb: 2, mx: 1.5 }}>
        <Stack align="center" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" target="_blank" href="https://n-hassan01.github.io/PortfolioWebsite/">
              Naimul Hassan
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

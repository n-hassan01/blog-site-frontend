import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
// components
import { login } from '../../../Services/ApiServices';
import { getAccountDetailsService } from '../../../Services/GetAccountsDetails';
import { loggedInUserDetails } from '../../../Services/GetLoggedInUserDetails';
import removeCookie from '../../../Services/RemoveCookieService';
import setCookie from '../../../Services/SetCookieService';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const initialUser = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(initialUser);

  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const accountDetails = await getAccountDetailsService();
        setProfile(accountDetails);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const response = await login(user);

      if (response.request.status === 200) {
        alert(response.data.message);

        const token = response.data.value;
        const cookieName = 'jwt-token-cookie';

        removeCookie(cookieName);
        removeCookie('email-cookie');

        const cookie = setCookie(cookieName, token);
        const emailCookie = setCookie('email-cookie', user.email);

        // console.log(loggedInUserDetails.getLoggedInUserEmail);
        loggedInUserDetails.setLoggedInUserEmail = user.email;
        loggedInUserDetails.setLoggedInUserRole = profile.role;

        console.log(cookie);
        console.log(emailCookie);

        navigate('/dashboard');
      } else {
        alert('Authentication failed! Try again');
      }
    } catch (err) {
      console.log(err.message);
      alert('Authentication failed! Try again');
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" autoComplete="given-name" onChange={(e) => onValueChange(e)} />

        <TextField
          name="password"
          label="Password"
          autoComplete="new-password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => onValueChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="end" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>

      <Stack align="center" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {'Copyright © '}
          <Link color="inherit" target="_blank" href="https://www.linkedin.com/in/naimul-hassan-432148197/">
            Naimul Hassan
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Stack>
    </>
  );
}

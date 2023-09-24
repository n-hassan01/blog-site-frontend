import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
// components
import { getAccountDetails, login } from '../../../Services/ApiServices';
import removeCookie from "../../../Services/RemoveCookieService";
import setCookie from "../../../Services/SetCookieService";
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const initialUser = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUser);
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = async() => {
    console.log(user);
    try {
      const response = await login(user);
      const accountDetails = await getAccountDetails(user.email);
      console.log('api call response');

      if (response.request.status === 200) {
        alert(response.data.message);

        const token = response.data.value;
        const cookieName = 'jwt-token-cookie';

        const account = {
          displayName: accountDetails.data.name,
          role: accountDetails.data.role,
          profession: accountDetails.data.profession,
          email: accountDetails.data.email,
          photoURL: accountDetails.data.photoURL,
          address: accountDetails.data.address,
          phone: accountDetails.data.phone,
          age: accountDetails.data.age,
          gender: accountDetails.data.gender,
        };

        removeCookie(cookieName);
        removeCookie('account-details-cookie');
        removeCookie('email-cookie');

        const cookie = setCookie(cookieName, token);
        const emailCookie = setCookie('email-cookie', user.email);
        const accountCookie = setCookie('account-details-cookie', JSON.stringify(account));
        
        console.log(cookie);
        console.log(emailCookie);
        console.log(accountCookie);
        navigate('/dashboard');
      } else {
        alert('Authentication failed! Try again');
      }
    } catch (err) {
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
        <Typography variant="body2" color="text.secondary" >
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

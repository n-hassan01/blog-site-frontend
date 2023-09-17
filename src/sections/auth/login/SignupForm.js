import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const initialUser = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
  };
  const [user, setUser] = useState(initialUser);
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const options = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Writer' },
    { value: 3, label: 'Viewer' },
  ]

  const onValueChange = (e) => {
    if (e.target) setUser({ ...user, [e.target.name]: e.target.value });
    else setUser({ ...user, 'role': e.value });

  };

  const handleClick = () => {
    console.log(user);
    
    navigate('/login', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="name"
          label="Name"
          autoComplete="given-name"
          onChange={(e) => onValueChange(e)}
        />
        
        <TextField
          required
          name="email"
          label="Email address"
          autoComplete="given-name"
          onChange={(e) => onValueChange(e)}
        />

        <TextField
          autoComplete="new-password"
          required
          name="password"
          label="Password"
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
        <TextField
          autoComplete="new-password"
          required
          name="confirmpassword"
          label="Confirim Password"
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
        <Select
          required
          name="role"
          placeholder="User role"
          autoComplete="given-name"
          onChange={(e) => onValueChange(e)}
          options={options}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Sign up
        </LoadingButton>
      </Stack>
    </>
  );
}

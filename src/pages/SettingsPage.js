import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// component
import account from '../_mock/account';
import Iconify from '../components/iconify';

export default function App() {
    // states
  const initialProfileDetails = {
    profession: account.profession,
    address: account.address,
    phone: account.phone,
    age: account.profession,
    gender: account.profession,
  };
  const [profileDetails, setProfileDetails] = useState(initialProfileDetails);

  const [user, setUser] = useState(account);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const options = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
    { value: 'Not to mention', label: 'Not to mention' },
  ];

  const selectedGender = options.map((gender, index) => {
    if (gender.value === user.gender) {
      return index;
    }
    return null;
  });

  const onValueChangeProfileDetails = (e) => {
    if (e.target) setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
    else setProfileDetails({ ...profileDetails, gender: e.value });
  };

  const handleClick = () => {
    console.log(profileDetails);
  };

  return (
    <MDBAccordion initialActive={1}>
      <MDBAccordionItem collapseId={1} headerTitle="Profile Settings">
        <Stack spacing={3}>
          <TextField name="profession" label="Profession" value={user.profession} onChange={(e) => onValueChangeProfileDetails(e)} />
          <TextField name="address" label="Address" value={user.address} onChange={(e) => onValueChangeProfileDetails(e)} />
          <TextField name="phone" label="Phone" value={user.phone} onChange={(e) => onValueChangeProfileDetails(e)} />
          <TextField name="age" label="Age" value={user.age} onChange={(e) => onValueChangeProfileDetails(e)} />

          <Select
            name="gender"
            placeholder="Gender"
            defaultValue={options[selectedGender[0]]}
            onChange={(e) => onValueChangeProfileDetails(e)}
            options={options}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
            Update
          </LoadingButton>
        </Stack>
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={2} headerTitle="Security Settings">
        <TextField
          autoComplete="new-password"
          required
          name="password"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => onValueChangeProfileDetails(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          autoComplete="new-password"
          required
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => onValueChangeProfileDetails(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={3} headerTitle="Account Settings">
        <TextField
          autoComplete="new-password"
          required
          name="password"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => onValueChangeProfileDetails(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          autoComplete="new-password"
          required
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => onValueChangeProfileDetails(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      </MDBAccordionItem>
    </MDBAccordion>
  );
}

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
  const [user, setUser] = useState(account);
  // console.log(user);

  const initialProfileDetails = {
    profession: user.profession,
    address: user.address,
    phone: user.phone,
    age: user.profession,
    gender: user.profession,
  };
  const [profileDetails, setProfileDetails] = useState(initialProfileDetails);

  const initialSecurityDetails = {
    password: user.profession,
  };
  const [securityDetails, setSecurityDetails] = useState(initialSecurityDetails);

  const initialAccountDetails = {
    name: user.displayName,
  };
  const [accountDetails, setAccountDetails] = useState(initialAccountDetails);

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
    if (e.target) setUser({ ...user, [e.target.name]: e.target.value });
    else setUser({ ...user, gender: e.value });

    if (e.target) setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
    else setProfileDetails({ ...profileDetails, gender: e.value });
  };

  const onValueChangeSecurityDetails = (e) => {
    if (e.target.name === 'password') setSecurityDetails({ ...securityDetails, [e.target.name]: e.target.value });
  };

  const onValueChangeAccountDetails = (e) => {
    setUser({ ...user, displayName: e.target.value });
    setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
  };

  const updateProfileDetails = () => {
    console.log(profileDetails);
  };

  const updateSecurityDetails = () => {
    console.log(securityDetails);
  };

  const updateAccountDetails = () => {
    console.log(accountDetails);
  };

  return (
    <MDBAccordion initialActive={1}>
      <MDBAccordionItem collapseId={1} headerTitle="Profile Settings">
        <Stack spacing={3}>
          <TextField
            name="profession"
            label="Profession"
            value={user.profession}
            onChange={(e) => onValueChangeProfileDetails(e)}
          />
          <TextField
            name="address"
            label="Address"
            value={user.address}
            onChange={(e) => onValueChangeProfileDetails(e)}
          />
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
          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={updateProfileDetails}>
            Update
          </LoadingButton>
        </Stack>
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={2} headerTitle="Security Settings">
        <Stack spacing={3}>
          <TextField
            autoComplete="new-password"
            required
            name="oldPassword"
            label="Old Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => onValueChangeSecurityDetails(e)}
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
            name="password"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => onValueChangeSecurityDetails(e)}
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
            onChange={(e) => onValueChangeSecurityDetails(e)}
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
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={updateSecurityDetails}>
            Update
          </LoadingButton>
        </Stack>
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={3} headerTitle="Account Settings">
        <Stack spacing={3}>
          <TextField
            name="name"
            label="Name"
            value={user.displayName}
            onChange={(e) => onValueChangeAccountDetails(e)}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={updateAccountDetails}>
            Update
          </LoadingButton>
        </Stack>
      </MDBAccordionItem>
    </MDBAccordion>
  );
}

import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// component
import { updateProfileDetails } from '../Services/ApiServices';
import { getAccountDetailsService } from '../Services/GetAccountsDetails';
import Iconify from '../components/iconify';

export default function SettingsPage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const accountDetails = await getAccountDetailsService(); 
        setUser(accountDetails); 
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); 
  }, []);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => phone.length >= 11;

  const options = [
    { value: null, label: '--Gender--' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
    { value: 'Not to mention', label: 'Not to mention' },
  ];

  // const selectedGenderIndex = 0;
  // for (let index = 0; index < options.length; index=+1) {
  //   // if(options[index].value === user.gender) 
  //   // {
  //   //   selectedGenderIndex = index
  //   // }
  //   console.log(selectedGenderIndex);
  // }

  const initialSecurityDetails = {
    password: user.profession,
  };
  const [securityDetails, setSecurityDetails] = useState(initialSecurityDetails);

  const initialAccountDetails = {
    name: user.name,
  };
  const [accountDetails, setAccountDetails] = useState(initialAccountDetails);

  // on value change functions
  const onValueChangeProfileDetails = (e) => {
    if (e.target) setUser({ ...user, [e.target.name]: e.target.value });
    else setUser({ ...user, gender: e.value });
  };

  const onValueChangeSecurityDetails = (e) => {
    if (e.target.name === 'password') setSecurityDetails({ ...securityDetails, [e.target.name]: e.target.value });
  };

  const onValueChangeAccountDetails = (e) => {
    setUser({ ...user, name: e.target.value });
    setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
  };

  // on submit functions
  const submitProfileDetails = async () => {
    console.log(user);
    // form validation
    const { phone } = user;
    const newErrors = {};

    // Validate phone
    if (!validatePhone(phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const profileDetails = {
          profession: user.profession,
          address: user.address,
          phone: user.phone,
          age: user.age,
          gender: user.gender,
        };
        const response = await updateProfileDetails(user.email, profileDetails);

        if (response.status === 200) {
          alert('Profile updated successfully!');

          navigate('/dashboard/profile', { replace: true });
        } else {
          console.log(response);
          alert('Service failed! Try again later');
        }
      } catch (err) {
        alert('Service failed! Try again later');
      }
    } else {
      setErrors(newErrors);
    }
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
          <TextField
            name="phone"
            label="Phone"
            value={user.phone}
            onChange={(e) => onValueChangeProfileDetails(e)}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField name="age" label="Age" value={user.age} onChange={(e) => onValueChangeProfileDetails(e)} />

          <Select
            name="gender"
            placeholder="Gender"
            options={options}
            // defaultValue={options[selectedGenderIndex]}
            onChange={(e) => onValueChangeProfileDetails(e)}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={submitProfileDetails}>
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
            value={user.name}
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

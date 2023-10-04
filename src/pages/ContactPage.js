import { MDBBtn, MDBCheckbox, MDBInput, MDBTextArea, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';

// export default function App() {
//   return (
//     <div style={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
//       <MDBValidation
//         noValidate
//         id="form"
//         className="text-center"
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           backgroundColor: 'white',
//           padding: '40px',
//           position: 'absolute',
//           right: '75px',
//         }}
//       >
//         <h2>Contact us</h2>
//         <MDBValidationItem invalid feedback="Please provide your name.">
//           <MDBInput label="Name" v-model="name" wrapperClass="mb-4" required />
//         </MDBValidationItem>

//         <MDBValidationItem invalid feedback="Please provide your email.">
//           <MDBInput type="email" label="Email address" v-model="email" wrapperClass="mb-4" required />
//         </MDBValidationItem>

//         <MDBValidationItem invalid feedback="Please provide mail subject.">
//           <MDBInput label="Subject" v-model="subject" wrapperClass="mb-4" required />
//         </MDBValidationItem>

//         <MDBValidationItem invalid feedback="Please provide a message text.">
//           <MDBTextArea wrapperClass="mb-4" label="Message" required />
//         </MDBValidationItem>

//         <MDBValidationItem feedback="">
//           <MDBCheckbox wrapperClass="d-flex justify-content-center" label="Send me copy" />
//         </MDBValidationItem>

//         <MDBBtn type="submit" color="primary" block className="my-4">
//           Send
//         </MDBBtn>
//       </MDBValidation>
//     </div>
//   );
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack } from '@mui/material';
// external css
import '../_css/ContactPage.css';
// components
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const initialUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  };
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 6;
  const onValueChange = (e) => {
    if (e.target) setUser({ ...user, [e.target.name]: e.target.value });
    else setUser({ ...user, role: e.value });
  };

  const handleClick = async () => {
    const { email, password, confirmPassword } = user;
    const newErrors = {};

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = !email ? 'Email is required' : 'Invalid email address';
    }

    // Validate password
    if (!validatePassword(password)) {
      newErrors.password = !password ? 'Password is required' : 'Password must be at least 6 characters long';
    }

    // Validate confirmPassword
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      //   try {
      //     const response = await signup(user);

      //     if (response.status === 200) {
      //       alert("Signup successful!");
      //     } else {
      //       console.log(response);
      //       alert("Signup failed! Try again later");
      //     }

      //     navigate('/login', { replace: true });
      //   } catch (err) {
      //     alert("Signup failed! Try again later");
      //   }
      console.log('aaa');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <h2 className="title">Contact Details</h2>
      <Stack>
        <div className="column left">
          <div className="text">Get in Touch</div>
          <div className="icons">
            <div className="row">
            <Iconify icon={'mdi:approve'} />
              <div className="info">
                <div className="head">Name</div>
                <div className="sub-title">Naimul Hassan</div>
              </div>
            </div>
            <div className="row">
              <i className="fas fa-map-marker-alt" />
              <div className="info">
                <div className="head">Address</div>
                <div className="sub-title">Dhaka, Bangladesh</div>
              </div>
            </div>
            <div className="row">
              <i className="fas fa-envelope" />
              <div className="info">
                <div className="head">Email</div>
                <div className="sub-title">n.niloy06091996@gmail.com</div>
              </div>
            </div>
            <div className="row">
              <i className="fas fa-phone" />
              <div className="info">
                <div className="head">Phone</div>
                <div className="sub-title">(+880) 1515215937</div>
              </div>
            </div>
          </div>
        </div>
      </Stack>
      <Stack
        spacing={3}
        style={{
          width: '50%',
          maxWidth: '400px',
          //   backgroundColor: 'white',
          //   padding: '40px',
          //   position: 'absolute',
          //   right: '75px',
          //   height: '100%'
        }}
      >
        <MDBValidation
          noValidate
          id="form"
          className="text-center"
          style={{
            width: '100%',
            maxWidth: '400px',
            // backgroundColor: 'white',
            // padding: '40px',
            // position: 'absolute',
            // right: '75px',
          }}
        >
          <h2>Contact us</h2>
          <MDBValidationItem invalid feedback="Please provide your name.">
            <MDBInput label="Name" v-model="name" wrapperClass="mb-4" required />
          </MDBValidationItem>

          <MDBValidationItem invalid feedback="Please provide your email.">
            <MDBInput type="email" label="Email address" v-model="email" wrapperClass="mb-4" required />
          </MDBValidationItem>

          <MDBValidationItem invalid feedback="Please provide mail subject.">
            <MDBInput label="Subject" v-model="subject" wrapperClass="mb-4" required />
          </MDBValidationItem>

          <MDBValidationItem invalid feedback="Please provide a message text.">
            <MDBTextArea wrapperClass="mb-4" label="Message" required />
          </MDBValidationItem>

          <MDBValidationItem feedback="">
            <MDBCheckbox wrapperClass="d-flex justify-content-center" label="Send me copy" />
          </MDBValidationItem>

          <MDBBtn type="submit" color="primary" block className="my-4">
            Send
          </MDBBtn>
        </MDBValidation>
      </Stack>

      {/* <section className="contact" id="contact">
        <div className="max-width">
          <h2 className="title">Contact Details</h2>
          <div className="contact-content">
            <div className="column left">
              <div className="text">Get in Touch</div>
              <div className="icons">
                <div className="row">
                  <i className="fas fa-user" />
                  <div className="info">
                    <div className="head">Name</div>
                    <div className="sub-title">Naimul Hassan</div>
                  </div>
                </div>
                <div className="row">
                  <i className="fas fa-map-marker-alt" />
                  <div className="info">
                    <div className="head">Address</div>
                    <div className="sub-title">Dhaka, Bangladesh</div>
                  </div>
                </div>
                <div className="row">
                  <i className="fas fa-envelope" />
                  <div className="info">
                    <div className="head">Email</div>
                    <div className="sub-title">n.niloy06091996@gmail.com</div>
                  </div>
                </div>
                <div className="row">
                  <i className="fas fa-phone" />
                  <div className="info">
                    <div className="head">Phone</div>
                    <div className="sub-title">(+880) 1515215937</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column right">
              <div className="text">Message me</div>
              <form className="contact_form">
                <div className="fields">
                  <div className="field name">
                    <input type="text" id="name" placeholder="Name" required onChange={(e) => onValueChange(e)} />
                  </div>
                  <div className="field email">
                    <input type="email" id="email" placeholder="Email" required />
                  </div>
                </div>
                <div className="field">
                  <input type="text" id="subject" placeholder="Subject" required="" />
                </div>
                <div className="field textarea">
                  <textarea cols={30} rows={10} id="msg" placeholder="Message.." required="" defaultValue={''} />
                </div>
                <div className="button-area">
                  <button type="submit" onClick={handleClick}>
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

import getCookie from '../Services/GetCookieService';
// ----------------------------------------------------------------------

const loggedAccunt = getCookie('account-details-cookie');
console.log(loggedAccunt);
let loggedAccuntDetails = {};
if (loggedAccunt) loggedAccuntDetails = JSON.parse(loggedAccunt);

updateAccountInfo();

const account = {
  displayName: loggedAccuntDetails.displayName,
  role: loggedAccuntDetails.role,
  profession: loggedAccuntDetails.profession,
  email: loggedAccuntDetails.email,
  photoURL: loggedAccuntDetails.photoURL,
  address: loggedAccuntDetails.address,
  phone: loggedAccuntDetails.phone,
  age: loggedAccuntDetails.age,
  gender: loggedAccuntDetails.gender,
};

export default account;

function updateAccountInfo() {
  if (!loggedAccuntDetails) return;

  switch (loggedAccuntDetails.role) {
    case 1:
      loggedAccuntDetails.role = 'Admin';
      break;
    case 2:
      loggedAccuntDetails.role = 'Writer';
      break;
    case 3:
      loggedAccuntDetails.role = 'Viewer';
      break;
    default:
  }

  loggedAccuntDetails.displayName = !loggedAccuntDetails.displayName ? 'User' : loggedAccuntDetails.displayName;

  const dpLocation = '/assets/images/dp/';

  if (loggedAccuntDetails.photoURL) {
    loggedAccuntDetails.photoURL = `${dpLocation}${loggedAccuntDetails.photoURL}`;
  } else {
    let defaultProfilePhotoUrl = '';
    switch (loggedAccuntDetails.gender) {
      case 'Male':
        defaultProfilePhotoUrl = `${dpLocation}avatar_male.jpg`;
        break;
      case 'Female':
        defaultProfilePhotoUrl = `${dpLocation}avatar_female.jpg`;
        break;
      default:
        defaultProfilePhotoUrl = `${dpLocation}avatar_default.jpg`;
    }

    loggedAccuntDetails.photoURL = defaultProfilePhotoUrl;
  }
}

import getCookie from '../Services/GetCookieService';
// ----------------------------------------------------------------------

const loggedAccunt = getCookie('account-details-cookie');
const loggedAccuntDetails = JSON.parse(loggedAccunt);

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

console.log('acc');
console.log(account);

export default account;

function updateAccountInfo() {
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
  loggedAccuntDetails.photoURL = !loggedAccuntDetails.photoURL
    ? '/assets/images/dp/avatar_male.jpg'
    : loggedAccuntDetails.photoURL;
  let defaultProfilePhotoUrl = '';
  switch (loggedAccuntDetails.gender) {
    case 'Male':
      defaultProfilePhotoUrl = '/assets/images/dp/avatar_male.jpg';
      break;
    case 'Female':
      defaultProfilePhotoUrl = '/assets/images/dp/avatar_female.jpg';
      break;
    default:
      defaultProfilePhotoUrl = '/assets/images/dp/avatar_default.jpg';
  }
  if (!loggedAccuntDetails.photoURL) {
    loggedAccuntDetails.photoURL = defaultProfilePhotoUrl;
  }
}

import { getAccountDetails } from './ApiServices';
import getCookie from "./GetCookieService";


export const getAccountDetailsService = async () => {
  console.log(getCookie('email-cookie'));
  const response = await getAccountDetails(getCookie('email-cookie'));
  
  updateAccountInfo(response);

  return response.data;
};

function updateAccountInfo(response) {
  if (!response.data) return;

  switch (response.data.role) {
    case 1:
      response.data.role = 'Admin';
      break;
    case 2:
      response.data.role = 'Writer';
      break;
    case 3:
      response.data.role = 'Viewer';
      break;
    default:
  }

  response.data.name = !response.data.name ? 'User' : response.data.name;

  const dpLocation = '/assets/images/dp/';

  if (response.data.dpurl) {
    response.data.dpurl = `${dpLocation}${response.data.dpurl}`;
  } else {
    let defaultProfilePhotoUrl = '';
    switch (response.data.gender) {
      case 'Male':
        defaultProfilePhotoUrl = `${dpLocation}avatar_male.jpg`;
        break;
      case 'Female':
        defaultProfilePhotoUrl = `${dpLocation}avatar_female.jpg`;
        break;
      default:
        defaultProfilePhotoUrl = `${dpLocation}avatar_default.jpg`;
    }

    response.data.dpurl = defaultProfilePhotoUrl;
  }
  console.log(response.data.dpurl);
}
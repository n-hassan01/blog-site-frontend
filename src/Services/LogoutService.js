import removeCookie from "./RemoveCookieService";

const logout = () => {
    removeCookie('jwt-token-cookie');
    removeCookie('account-details-cookie');
    removeCookie('email-cookie');
}

export default logout;
import axios from 'axios';

const usersUrl = 'http://localhost:4000/';

export const signup = async (user) => {
    try{
        return await axios.post(`${usersUrl}signup/`, user)
    } catch (err) {
        console.log(err.message);
        
        return err.message;
    }
}

export const login = async (user) => {
    try{
        return await axios.post(`${usersUrl}login/`, user)
    } catch(err) {
        console.log(err.message);

        return err.message;
    }
}

export const getAccountDetails = async (emailAddress) => {
    try{
        return await axios.get(`${usersUrl}account-info/${emailAddress}`)
    } catch(err) {
        console.log(err.message);

        return err.message;
    }
}

export const updateProfileDetails = async (emailAddress, profileDetails) => {
    try{
        return await axios.put(`${usersUrl}update/profile/${emailAddress}`, profileDetails)
    } catch(err) {
        console.log(err.message);

        return err.message;
    }
}
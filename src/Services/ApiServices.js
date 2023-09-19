import axios from 'axios';

const usersUrl = 'http://localhost:4000/';

export const signup = async (user) => {
    try{
        return await axios.post(`${usersUrl}signup/`, user)
    } catch (err) {
        return err.message;
    }
}
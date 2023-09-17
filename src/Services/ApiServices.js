import axios from 'axios';

const usersUrl = 'http://localhost:4000/users/';

export const signup = async (user) => {
    try{
        return await axios.post(usersUrl, user)
    } catch (err) {
        return err.message;
    }
}
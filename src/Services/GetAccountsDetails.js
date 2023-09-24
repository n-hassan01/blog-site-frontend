export const getAccountDetails = () => {
    try{
      const account = {
        displayName: 'Naimul Hassan',
        role: 'Admin',
        profession: 'Software Engineer',
        email: 'naimul@gmail.com',
        photoURL: '/assets/images/avatars/avatar_default.jpg',
        address: 'Dhaka',
        phone: '01515215223',
        age: '25',
      };
      return account;
    } catch(err) {
        console.log(err.message);
  
        return err.message;
    }
  }
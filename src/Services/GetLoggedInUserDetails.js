export const loggedInUserDetails = {
  email: '',
  role: '',

  get getLoggedInUserEmail() {
    return this.email;
  },

  set setLoggedInUserEmail(emailAddress) {
    this.email = emailAddress;
  },

  get getLoggedInUserRole() {
    return this.role;
  },

  set setLoggedInUserRole(userRole) {
    this.role = userRole;
  },
};

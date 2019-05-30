import moment from 'moment';

class User {
  constructor(id, firstName, lastName, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.registeredOn = moment.now();
  }
}

export default User;

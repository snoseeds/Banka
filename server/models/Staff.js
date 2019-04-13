import User from './User';

// Defines base class for all internal users (cashier and admin)
class Staff extends User {
  constructor(...args) {
    super(...args);
    this.type = 'staff';
  }
}

export default Staff;

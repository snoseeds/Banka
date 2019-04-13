import Staff from './Staff';

// Defines base class for all internal users (cashier and admin)
class Admin extends Staff {
  constructor(...args) {
    super(...args);
    this.isAdmin = true;
  }
}

export default Admin;

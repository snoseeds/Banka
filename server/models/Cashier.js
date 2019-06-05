import Staff from './Staff';

// Defines base class for all internal users (cashier and admin)
class Cashier extends Staff {
  constructor(...args) {
    super(...args);
    this.isAdmin = false;
    this.acccounts = [];
  }
}

export default Cashier;

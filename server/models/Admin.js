import Staff from './Staff';

// Defines base class for all internal users (cashier and admin)
class Admin extends Staff {
  constructor(...args) {
    super(...args);
    const [,,,,, mobileNo, houseAddress, idCardType, idCardNumber] = args;
    this.mobileNo = mobileNo;
    this.houseAddress = houseAddress;
    this.idCardType = idCardType;
    this.idCardNumber = idCardNumber;
    this.isAdmin = true;
    this.isRootAdmin = false;
  }
}

export default Admin;

import Admin from './Admin';

// Defines base class for all internal users (cashier and admin)
class RootAdmin extends Admin {
  constructor(...args) {
    super(...args);
    const [,,,,, mobileNo, houseAddress, idCardType, idCardNumber] = args;
    this.mobileNo = mobileNo;
    this.houseAddress = houseAddress;
    this.idCardType = idCardType;
    this.idCardNumber = idCardNumber;
  }
}

export default RootAdmin;

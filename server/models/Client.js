import User from './User';

class Client extends User {
  constructor(...args) {
    super(...args);
    this.noOfAccounts = 0;
    this.accounts = [];
    this.type = 'client';
  }
}

export default Client;

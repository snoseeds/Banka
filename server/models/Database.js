class HardCodedData {
  constructor() {
    this.client = [{
      id: 1,
      firstName: 'john',
      lastName: 'doe',
      email: 'johndoe@gmail.com',
      password: 'olujuwondoke',
      type: 'client',
      noOfAccounts: 1,
      imageUrl: '',
      accounts: [{
        id: 1,
        accountNumber: 5187941354,
        createdOn: new Date(Date.now()),
        type: 'savings',
        owner: 1,
        status: 'active',
        balance: 100000.00,
        lastVisit: new Date(Date.now()),
      }],
    }];
    this.cashier = [{
      id: 1,
      firstName: 'adelabu',
      lastName: 'christopher',
      email: 'adechris@gmail.com',
      password: '$2b$10$rgZSWmHmx51L/VYEU10TcOKYVhLdFBI.yVkbxWoNz529r1WbxPoAK',
      imageUrl: '',
      type: 'staff',
      isAdmin: false,
    }]

    this.admin = [{
      id: 1,
      firstName: 'kehinde',
      lastName: 'soremekun',
      email: 'sky@gmail.com',
      password: '$2b$10$rgZSWmHmx51L/VYEU10TcOKYVhLdFBI.yVkbxWoNz529r1WbxPoAK',
      imageUrl: '',
      type: 'staff',
      isAdmin: true,
    }];
  }
}
const Database = new HardCodedData();

export default Database;

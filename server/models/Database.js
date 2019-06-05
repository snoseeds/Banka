import moment from 'moment';
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);
const clientHash = bcrypt.hashSync('olujuwondoke', salt);
const cashierHash = bcrypt.hashSync('christWasNeverGod', salt);
const adminHash = bcrypt.hashSync('kenny4roger', salt);
const rootAdminHash = bcrypt.hashSync('igbagbolani', salt);


class HardCodedData {
  constructor() {
    this.client = [{
      id: 1,
      firstName: 'john',
      lastName: 'doe',
      userMobileNo: 8193899887,
      email: 'johndoe@gmail.com',
      password: clientHash,
      type: 'client',
      registeredOn: moment.now(),
      lastVisit: '',
      noOfAccounts: 1,
      imageUrl: '',
      accounts: [
        {
          accountID: 1,
          idCardType: 3,
          idCardNumber: 'A09579437',
          acctMobileNo: '8025847569',
          accountNumber: '518791354',
          email: 'johndoe2@gmail.com',
          createdOn: moment.now(),
          type: 'savings',
          ownerID: 1,
          status: 'active',
          balance: 100000.00,
        },
        {
          accountID: 2,
          idCardType: 3,
          idCardNumber: 'A09579437',
          acctMobileNo: '8025847569',
          accountNumber: '895698752',
          email: 'johndoe2@gmail.com',
          createdOn: moment.now(),
          type: 'savings',
          ownerID: 1,
          status: 'active',
          balance: 100000.00,
        }
      ],
    }];
    this.cashier = [{
      id: 1,
      firstName: 'joshua',
      lastName: 'kuti',
      email: 'kutjosh@gmail.com',
      password: cashierHash,
      imageUrl: '',
      mobileNo: '+2348059006860',
      houseAddress: '11, Adedeji Obasa, Yewande, Giwa, Oke-Aro, Ifo, Ogun State',
      idCardType: 3,
      idCardNumber: 'A23244648',
      type: 'staff',
      isAdmin: false,
      isRootAdmin: false,
    }];

    this.admin = [{
      id: 1,
      firstName: 'kehinde',
      lastName: 'soremekun',
      email: 'sky@gmail.com',
      password: adminHash,
      imageUrl: '',
      mobileNo: '+2348103774484',
      houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
      idCardType: 3,
      idCardNumber: 'A23562548',
      type: 'staff',
      isAdmin: true,
      isRootAdmin: false,
    }];

    this.rootAdmin = [{
      id: 1,
      firstName: 'Olabisi',
      lastName: 'Abdus-Samee\'',
      email: 'snoworlddocs@gmail.com',
      password: rootAdminHash,
      imageUrl: '',
      mobileNo: '+2348125027766',
      houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
      idCardType: 3,
      idCardNumber: 'A23568974',
      type: 'staff',
      isAdmin: true,
      isRootAdmin: true,
    }];

    this.deletedBankAccts = {};
  }
}
const Database = new HardCodedData();

export default Database;

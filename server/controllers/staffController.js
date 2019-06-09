import initSignInAnyUserType from '../middlewares/signInAnyUserType';
import initRunDebitOrCredit from '../middlewares/runDebitOrCredit';

// import moment from 'moment';

// import pool from '../models/database';

const staff = {
  signin: initSignInAnyUserType('cashier'),

  creditBankAcct: initRunDebitOrCredit('credit', 'Credit amount'),

  debitBankAcct: initRunDebitOrCredit('debit', 'Debit amount'),
};

export default staff;

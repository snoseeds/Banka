import initSignInAnyUserType from '../middlewares/signInAnyUserType';
// import initRunDebitOrCredit from '../middlewares/runDebitOrCredit';

const staff = {
  signin: initSignInAnyUserType('cashier'),

  // creditBankAcct: initRunDebitOrCredit('credit', 'Credit amount'),

  // debitBankAcct: initRunDebitOrCredit('debit', 'Debit amount'),
};

export default staff;

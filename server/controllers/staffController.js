import initSignInAnyUserType from '../middlewares/signInAnyUserType';
import initRunDebitOrCredit from '../middlewares/runDebitOrCredit';
import initJobsToBeCarriedOut from '../middlewares/jobsToBeCarriedOut';

const staff = {
  signin: initSignInAnyUserType('cashier'),

  creditBankAcct: initJobsToBeCarriedOut(initRunDebitOrCredit('credit', 'Credit amount')),

  debitBankAcct: initJobsToBeCarriedOut(initRunDebitOrCredit('debit', 'Debit amount')),
};

export default staff;

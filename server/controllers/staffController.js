import async from 'async';
import initValidateFields from '../middlewares/validateFormFields';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAuthenticateUserType from '../middlewares/authenticateUserType';
import initGetBankAcctDetails from '../middlewares/getBankAcctDetails';
import initTransactOnBankAcctInDb from '../middlewares/transactOnBankAcctInDb';
import initSignInAnyUserType from '../middlewares/signInAnyUserType';
// import moment from 'moment';

// import pool from '../models/database';

const staff = {
  signin: [initSignInAnyUserType('cashier')],

  creditBankAcct: [
    function getAndPersistReqProps(req, res) {
      const { accountNumber } = req.params;
      const { amount } = req.body;
      const reqdFieldsDescription = {
        'Credit amount': amount,
      };
      staff.creditBankAcct[1] = initAuthenticateUserType('cashier');
      staff.creditBankAcct[2] = initCheckUserInDb();
      staff.creditBankAcct[3] = initGetBankAcctDetails(accountNumber);
      staff.creditBankAcct[4] = initValidateFields(reqdFieldsDescription);
      staff.creditBankAcct[5] = initTransactOnBankAcctInDb(amount, 'credit');

      // eslint-disable-next-line consistent-return
      async.series(staff.creditBankAcct.slice(1).map(mw => mw.bind(null, req, res)));
    }],
};

export default staff;

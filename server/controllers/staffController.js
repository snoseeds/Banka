import async from 'async';
import initValidateFields from '../middlewares/validateFormFields';
import initTransactOnBankAcctInDb from '../middlewares/transactOnBankAcctInDb';
import initSignInAnyUserType from '../middlewares/signInAnyUserType';
import initIsTransactionAmountValid from '../middlewares/isTransactionAmountValid';

// import moment from 'moment';

// import pool from '../models/database';

const staff = {
  signin: initSignInAnyUserType('cashier'),

  creditBankAcct(req, res) {
    const { amount } = req.body;
    const creditMiddlewares = [
      initValidateFields({ 'Credit amount': amount }),
      initIsTransactionAmountValid(parseFloat(amount), 'credit'),
      initTransactOnBankAcctInDb(amount, 'credit'),
    ];
    // eslint-disable-next-line consistent-return
    async.series([...req.middlewaresArr, ...creditMiddlewares]
      .map(mw => mw.bind(null, req, res)));
  },
};

export default staff;

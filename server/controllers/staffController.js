import async from 'async';
import initValidateFields from '../middlewares/validateFormFields';
import initValidateUserType from '../middlewares/validateUserType';
import initLoginUser from '../middlewares/loginUser';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAuthenticateUserType from '../middlewares/authenticateUserType';
import initGetBankAcctDetails from '../middlewares/getBankAcctDetails';
import initTransactOnBankAcctInDb from '../middlewares/transactOnBankAcctInDb';

// import moment from 'moment';

// import pool from '../models/database';


/**
 * @class UserController
 */
// class UserController {
//   constructor() {
const staff = {
  signin: [
    function getAndPersistReqProps(req, res) {
      const {
        email,
        password,
        typeOfUser,
      } = req.body;
      const reqdFieldsDescription = {
        Email: email,
        Password: password,
        'Type of user': typeOfUser,
      };
      staff.signin[1] = initValidateFields(reqdFieldsDescription);
      staff.signin[2] = initValidateUserType('cashier', typeOfUser);
      staff.signin[3] = initCheckUserInDb(email);
      staff.signin[4] = initLoginUser(typeOfUser, email, password);
      // eslint-disable-next-line consistent-return
      async.series(staff.signin.slice(1).map(mw => mw.bind(null, req, res)));
    }],

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

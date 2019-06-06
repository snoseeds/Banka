import async from 'async';
import initAuthenticateUserType from '../middlewares/authenticateUserType';
import initValidateFields from '../middlewares/validateFormFields';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initGetBankAcctDetails from '../middlewares/getBankAcctDetails';
import changeAcctStatusInDb from '../middlewares/changeAcctStatusInDB';
import deleteBankAcctInDb from '../middlewares/deleteBankAcctInDb';

// import moment from 'moment';

// import pool from '../models/database';


/**
 * @class UserController
 */
// class UserController {
//   constructor() {
const staffAndAdmin = {
  changeBankAcctStatus: [
    function getAndPersistReqProps(req, res) {
      const { accountNumber } = req.params;
      staffAndAdmin.changeBankAcctStatus[1] = initAuthenticateUserType('admin', 'cashier');
      staffAndAdmin.changeBankAcctStatus[2] = initCheckUserInDb();
      staffAndAdmin.changeBankAcctStatus[3] = initGetBankAcctDetails(accountNumber);
      staffAndAdmin.changeBankAcctStatus[4] = changeAcctStatusInDb;
      // eslint-disable-next-line consistent-return
      async.series(staffAndAdmin.changeBankAcctStatus.slice(1).map(mw => mw.bind(null, req, res)));
    }],
  deleteBankAcct: [
    function getAndPersistReqProps(req, res) {
      const { accountNumber } = req.params;
      staffAndAdmin.deleteBankAcct[1] = initAuthenticateUserType('admin', 'cashier');
      staffAndAdmin.deleteBankAcct[2] = initCheckUserInDb();
      staffAndAdmin.deleteBankAcct[3] = initGetBankAcctDetails(accountNumber);
      staffAndAdmin.deleteBankAcct[4] = deleteBankAcctInDb;
      // eslint-disable-next-line consistent-return
      async.series(staffAndAdmin.deleteBankAcct.slice(1).map(mw => mw.bind(null, req, res)));
    }],
};

export default staffAndAdmin;

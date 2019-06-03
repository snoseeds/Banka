import async from 'async';
import initAuthenticateUserType from '../middlewares/authenticateUserType';
import initValidateFields from '../middlewares/validateFormFields';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initGetBankAcctDetails from '../middlewares/getBankAcctDetails';
import changeAcctStatusInDb from '../middlewares/changeAcctStatusInDB';

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
};

export default staffAndAdmin;

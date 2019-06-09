import changeAcctStatusInDb from '../middlewares/changeAcctStatusInDB';
import deleteBankAcctInDb from '../middlewares/deleteBankAcctInDb';
import initStaffAndAdminJobber from '../middlewares/staffAndAdminJobber';

// import moment from 'moment';

// import pool from '../models/database';

const staffAndAdmin = {
  changeBankAcctStatus: initStaffAndAdminJobber(changeAcctStatusInDb),

  deleteBankAcct: initStaffAndAdminJobber(deleteBankAcctInDb),
};

export default staffAndAdmin;

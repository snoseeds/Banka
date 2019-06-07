import initAnyUserTypeAcctCreator from '../middlewares/anyUserTypeAcctCreator';
import initSignInAnyUserType from '../middlewares/signInAnyUserType';
// import moment from 'moment';

// import pool from '../models/database';

const admin = {
  signin: [initSignInAnyUserType('admin')],

  createAdminAcct: [initAnyUserTypeAcctCreator('admin', 'admin')],

  createStaffAcct: [initAnyUserTypeAcctCreator('admin', 'cashier')],
};

export default admin;

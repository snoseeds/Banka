import initAnyUserTypeAcctCreator from '../middlewares/anyUserTypeAcctCreator';
import initSignInAnyUserType from '../middlewares/signInAnyUserType';

// import moment from 'moment';

// import pool from '../models/database';

const rootAdmin = {
  signup: [initAnyUserTypeAcctCreator(null, 'rootAdmin')],

  signin: [initSignInAnyUserType('rootAdmin')],


  createAdminAcct: [initAnyUserTypeAcctCreator('rootAdmin', 'admin')],
};

export default rootAdmin;

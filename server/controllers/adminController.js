import async from 'async';
import initValidateFields from '../middlewares/validateFormFields';
import initValidateUserType from '../middlewares/validateUserType';
import initLoginUser from '../middlewares/loginUser';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAnyUserTypeAcctCreator from '../middlewares/anyUserTypeAcctCreator';

// import moment from 'moment';

// import pool from '../models/database';

const admin = {
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
      admin.signin[1] = initValidateFields(reqdFieldsDescription);
      admin.signin[2] = initValidateUserType('admin', typeOfUser);
      admin.signin[3] = initCheckUserInDb(email);
      admin.signin[4] = initLoginUser(typeOfUser, email, password);
      // eslint-disable-next-line consistent-return
      async.series(admin.signin.slice(1).map(mw => mw.bind(null, req, res)));
    }],

  createAdminAcct: [initAnyUserTypeAcctCreator('admin', 'admin')],

  createStaffAcct: [initAnyUserTypeAcctCreator('admin', 'cashier')],
};

export default admin;

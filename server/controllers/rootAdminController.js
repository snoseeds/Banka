import async from 'async';
import initValidateFields from '../middlewares/validateFormFields';
import initValidateUserType from '../middlewares/validateUserType';
import initLoginUser from '../middlewares/loginUser';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAnyUserTypeAcctCreator from '../middlewares/anyUserTypeAcctCreator';

// import moment from 'moment';

// import pool from '../models/database';

const rootAdmin = {
  signup: [initAnyUserTypeAcctCreator(null, 'rootAdmin')],

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
      rootAdmin.signin[1] = initValidateFields(reqdFieldsDescription);
      rootAdmin.signin[2] = initValidateUserType('rootAdmin', typeOfUser);
      rootAdmin.signin[3] = initCheckUserInDb(email);
      rootAdmin.signin[4] = initLoginUser(typeOfUser, email, password);
      // eslint-disable-next-line consistent-return
      async.series(rootAdmin.signin.slice(1).map(mw => mw.bind(null, req, res)));
    }],

  createAdminAcct: [initAnyUserTypeAcctCreator('rootAdmin', 'admin')],
};

export default rootAdmin;

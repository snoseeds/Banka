import async from 'async';
import initValidateFields from '../middlewares/validateFormFields';
import initValidateUserType from '../middlewares/validateUserType';
import initPasswordsMatch from '../middlewares/checkPasswordsMatch';
import initCheckUserUniquenessInDB from '../middlewares/checkUserUniquenessInDB';
import initAddToDatabase from '../middlewares/addToDatabase';
import initLoginUser from '../middlewares/loginUser';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAuthenticateUserType from '../middlewares/authenticateUserType';
import initCreateBankAcct from '../middlewares/createNewBankAcct';


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
};

export default staff;

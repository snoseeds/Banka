import async from 'async';
import initValidateFields from '../middlewares/validateFormFields';
import initValidateUserType from '../middlewares/validateUserType';
import initPasswordsMatch from '../middlewares/checkPasswordsMatch';
import initCheckUserUniquenessInDB from '../middlewares/checkUserUniquenessInDB';
import initAddToDatabase from '../middlewares/addToDatabase';
import initLoginUser from '../middlewares/loginUser';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAuthenticateUserType from '../middlewares/authenticateUserType';

// import moment from 'moment';

// import pool from '../models/database';


/**
 * @class UserController
 */
// class UserController {
//   constructor() {
const rootAdmin = {
  signup: [
    function getAndPersistReqProps(req, res) {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        typeOfUser,
        mobileNo,
        houseAddress,
        idCardType,
        idCardNumber,
      } = req.body;
      const reqdFieldsDescription = {
        'First name': firstName,
        'Last name': lastName,
        Email: email,
        Password: password,
        'Type of user': typeOfUser,
        'Mobile Number': mobileNo,
        'House Address': houseAddress,
        'ID Card Type': idCardType,
        'ID Card Number': idCardNumber,
      };
      rootAdmin.signup[1] = initValidateFields(reqdFieldsDescription);
      rootAdmin.signup[2] = initValidateUserType('rootAdmin', typeOfUser);
      rootAdmin.signup[3] = initPasswordsMatch(password, confirmPassword);
      rootAdmin.signup[4] = initCheckUserUniquenessInDB('rootAdmin', [email, mobileNo,
        idCardNumber], { Email: 'email', 'Mobile number': 'mobileNo', 'ID Card Number': 'idCardNumber' });
      rootAdmin.signup[5] = initAddToDatabase('rootAdmin', firstName, lastName, email,
        password, mobileNo, houseAddress, idCardType, idCardNumber);
      // eslint-disable-next-line consistent-return
      async.series(rootAdmin.signup.slice(1).map(mw => mw.bind(null, req, res)));
    }],

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

  createAdminAcct: [
    function getAndPersistReqProps(req, res) {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        typeOfUser,
        mobileNo,
        houseAddress,
        idCardType,
        idCardNumber,
      } = req.body;
      const reqdFieldsDescription = {
        'First name': firstName,
        'Last name': lastName,
        Email: email,
        Password: password,
        'Type of user': typeOfUser,
        'Mobile Number': mobileNo,
        'House Address': houseAddress,
        'ID Card Type': idCardType,
        'ID Card Number': idCardNumber,
      };
      rootAdmin.createAdminAcct[1] = initAuthenticateUserType('rootAdmin');
      rootAdmin.createAdminAcct[2] = initCheckUserInDb();
      rootAdmin.createAdminAcct[3] = initValidateFields(reqdFieldsDescription);
      rootAdmin.createAdminAcct[4] = initValidateUserType('admin', typeOfUser);
      rootAdmin.createAdminAcct[5] = initPasswordsMatch(password, confirmPassword);
      rootAdmin.createAdminAcct[6] = initCheckUserUniquenessInDB('admin', [email, mobileNo,
        idCardNumber], { Email: 'email', 'Mobile number': 'mobileNo', 'ID Card Number': 'idCardNumber' });
      rootAdmin.createAdminAcct[7] = initAddToDatabase('admin', firstName, lastName, email,
        password, mobileNo, houseAddress, idCardType, idCardNumber);
      // eslint-disable-next-line consistent-return
      async.series(rootAdmin.createAdminAcct.slice(1).map(mw => mw.bind(null, req, res)));
    }],
};

export default rootAdmin;

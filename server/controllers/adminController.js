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
const admin = {
  signin: [
    function getAndPersistReqProps(req, res, next) {
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
      admin.signin[3] = initCheckUserInDb(typeOfUser, email);
      admin.signin[4] = initLoginUser(typeOfUser, email, password);
      // eslint-disable-next-line consistent-return
      async.series(admin.signin.slice(1).map(mw => mw.bind(null, req, res)), (err) => {
        if (err) {
          console.log('There is a problem running the middleware');
          return next(err);
        }
        next();
      });
    }],

  createAdminAcct: [
    function getAndPersistReqProps(req, res, next) {
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
      admin.createAdminAcct[1] = initAuthenticateUserType('admin');
      admin.createAdminAcct[2] = initCheckUserInDb('admin');
      admin.createAdminAcct[3] = initValidateFields(reqdFieldsDescription);
      admin.createAdminAcct[4] = initValidateUserType('admin', typeOfUser);
      admin.createAdminAcct[5] = initPasswordsMatch(password, confirmPassword);
      admin.createAdminAcct[6] = initCheckUserUniquenessInDB('admin', [email, mobileNo,
        idCardNumber], { Email: 'email', 'Mobile number': 'mobileNo', 'ID Card Number': 'idCardNumber' });
      admin.createAdminAcct[7] = initAddToDatabase('admin', firstName, lastName, email,
        password, mobileNo, houseAddress, idCardType, idCardNumber);
      // eslint-disable-next-line consistent-return
      async.series(admin.createAdminAcct.slice(1).map(mw => mw.bind(null, req, res)), (err) => {
        if (err) {
          console.log('There is a problem running the middleware');
          return next(err);
        }
        next();
      });
    }],
  
  createStaffAcct: [
    function getAndPersistReqProps(req, res, next) {
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
      admin.createStaffAcct[1] = initAuthenticateUserType('admin');
      admin.createStaffAcct[2] = initCheckUserInDb('admin');
      admin.createStaffAcct[3] = initValidateFields(reqdFieldsDescription);
      admin.createStaffAcct[4] = initValidateUserType('cashier', typeOfUser);
      admin.createStaffAcct[5] = initPasswordsMatch(password, confirmPassword);
      admin.createStaffAcct[6] = initCheckUserUniquenessInDB('cashier', [email, mobileNo,
        idCardNumber], { Email: 'email', 'Mobile number': 'mobileNo', 'ID Card Number': 'idCardNumber' });
      admin.createStaffAcct[7] = initAddToDatabase('cashier', firstName, lastName, email,
        password, mobileNo, houseAddress, idCardType, idCardNumber);
      // eslint-disable-next-line consistent-return
      async.series(admin.createStaffAcct.slice(1).map(mw => mw.bind(null, req, res)), (err) => {
        if (err) {
          console.log('There is a problem running the middleware');
          return next(err);
        }
        next();
      });
    }],


};

export default admin;

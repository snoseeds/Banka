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

  /**
   * creates new user (client, cashier, or admin)
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} status code with string or json object
   * @memberof UserController
   */



  /**
   * creates new user (client, cashier, or admin)
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} status code with string or json object
   * @memberof UserController
   */
  // createBankAccount: [
  //   function getAndPersistReqProps(req, res, next) {
  //     const {
  //       accountType,
  //       idCardType,
  //       idCardNumber,
  //       acctMobileNo,
  //     } = req.body;
  //     const reqdFieldsDescription = {
  //       'Type of account (current or savings)': accountType,
  //       'Type of identification card': idCardType,
  //       'Identification card number': idCardNumber,
  //     };
  //     const authenticateUserType = initAuthenticateUserType('client');
  //     user.createBankAccount[1] = authenticateUserType.bind(null, req, res);
  //     const checkUserInDb = initCheckUserInDb('client');
  //     user.createBankAccount[2] = checkUserInDb.bind(null, req, res);
  //     const validateCreateAcctFields = initValidateFields(reqdFieldsDescription);
  //     user.createBankAccount[3] = validateCreateAcctFields.bind(null, req, res);
  //     const createNewBankAcct = initCreateBankAcct(accountType,
  //       idCardType, idCardNumber, acctMobileNo);
  //     user.createBankAccount[4] = createNewBankAcct.bind(null, req, res);
  //     // eslint-disable-next-line consistent-return
  //     async.series(user.createBankAccount.slice(1), (err) => {
  //       if (err) {
  //         console.log('There is a problem running the middleware');
  //         return next(err);
  //       }
  //       next();
  //     });
  //   }],
};

export default admin;

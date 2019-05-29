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
const rootAdmin = {
  signup: [
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
      rootAdmin.signup[1] = initValidateFields(reqdFieldsDescription);
      rootAdmin.signup[2] = initValidateUserType('rootAdmin', typeOfUser);
      rootAdmin.signup[3] = initPasswordsMatch(password, confirmPassword);
      rootAdmin.signup[4] = initCheckUserUniquenessInDB('rootAdmin', [email, mobileNo,
        idCardNumber], { Email: 'email', 'Mobile number': 'mobileNo', 'ID Card Number': 'idCardNumber' });
      rootAdmin.signup[5] = initAddToDatabase('rootAdmin', firstName, lastName, email,
        password, mobileNo, houseAddress, idCardType, idCardNumber);
      // eslint-disable-next-line consistent-return
      async.series(rootAdmin.signup.slice(1).map(mw => mw.bind(null, req, res)), (err) => {
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
  // signin: [
  //   function getAndPersistReqProps(req, res, next) {
  //     const {
  //       email,
  //       password,
  //       typeOfUser,
  //     } = req.body;
  //     const reqdFieldsDescription = {
  //       Email: email,
  //       Password: password,
  //       'Type of user': typeOfUser,
  //     };
  //     const validateSignInField = initValidateFields(reqdFieldsDescription);
  //     user.signin[1] = validateSignInField.bind(null, req, res);
  //     const validateUserType = initValidateUserType('client', typeOfUser);
  //     user.signin[2] = validateUserType.bind(null, req, res);
  //     const checkUserInDb = initCheckUserInDb(typeOfUser, email);
  //     user.signin[3] = checkUserInDb.bind(null, req, res);
  //     const loginUser = initLoginUser(typeOfUser, email, password);
  //     user.signin[4] = loginUser.bind(null, req, res);
  //     // eslint-disable-next-line consistent-return
  //     async.series(user.signin.slice(1), (err) => {
  //       if (err) {
  //         console.log('There is a problem running the middleware');
  //         return next(err);
  //       }
  //       next();
  //     });
  //   }],


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

export default rootAdmin;

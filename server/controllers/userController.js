import async from 'async';
import initValidateFields from '../middlewares/validateFormFields';
import initValidateUserType from '../middlewares/validateUserType';
import initLoginUser from '../middlewares/loginUser';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAuthenticateUserType from '../middlewares/authenticateUserType';
import initCreateBankAcct from '../middlewares/createNewBankAcct';
import initAnyUserTypeAcctCreator from '../middlewares/anyUserTypeAcctCreator';


// import moment from 'moment';

// import pool from '../models/database';

const user = {
  signup: [initAnyUserTypeAcctCreator(null, 'client')],

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
      const validateSignInField = initValidateFields(reqdFieldsDescription);
      user.signin[1] = validateSignInField.bind(null, req, res);
      const validateUserType = initValidateUserType('client', typeOfUser);
      user.signin[2] = validateUserType.bind(null, req, res);
      const checkUserInDb = initCheckUserInDb(email);
      user.signin[3] = checkUserInDb.bind(null, req, res);
      const loginUser = initLoginUser(typeOfUser, email, password);
      user.signin[4] = loginUser.bind(null, req, res);
      // eslint-disable-next-line consistent-return
      async.series(user.signin.slice(1));
    }],

  createBankAccount: [
    function getAndPersistReqProps(req, res) {
      const {
        accountType,
        idCardType,
        idCardNumber,
        acctMobileNo,
      } = req.body;
      const reqdFieldsDescription = {
        'Type of account (current or savings)': accountType,
        'Type of identification card': idCardType,
        'Identification card number': idCardNumber,
      };
      const authenticateUserType = initAuthenticateUserType('client');
      user.createBankAccount[1] = authenticateUserType.bind(null, req, res);
      const checkUserInDb = initCheckUserInDb();
      user.createBankAccount[2] = checkUserInDb.bind(null, req, res);
      const validateCreateAcctFields = initValidateFields(reqdFieldsDescription);
      user.createBankAccount[3] = validateCreateAcctFields.bind(null, req, res);
      const createNewBankAcct = initCreateBankAcct(accountType,
        idCardType, idCardNumber, acctMobileNo);
      user.createBankAccount[4] = createNewBankAcct.bind(null, req, res);
      // eslint-disable-next-line consistent-return
      async.series(user.createBankAccount.slice(1));
    }],
};

// const Users = new UserController();
export default user;

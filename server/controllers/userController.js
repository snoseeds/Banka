import async from 'async';
import initValidateFields from '../middlewares/validateFormFields';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAuthenticateUserType from '../middlewares/authenticateUserType';
import initCreateBankAcct from '../middlewares/createNewBankAcct';
import initAnyUserTypeAcctCreator from '../middlewares/anyUserTypeAcctCreator';
import initSignInAnyUserType from '../middlewares/signInAnyUserType';

// import moment from 'moment';

// import pool from '../models/database';

const user = {
  signup: initAnyUserTypeAcctCreator(null, 'client'),

  signin: initSignInAnyUserType('client'),

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

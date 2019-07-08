import initValidateFields from '../middlewares/validateFormFields';
import initCheckUserInDb from '../middlewares/checkUserInDb';
import initAuthenticateUserType from '../middlewares/authenticateUserType';
import initCreateBankAcct from '../middlewares/createNewBankAcct';
import initAnyUserTypeAcctCreator from '../middlewares/anyUserTypeAcctCreator';
import initSignInAnyUserType from '../middlewares/signInAnyUserType';
import runMiddlewares from '../middlewares/runMiddlewares';

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
      const createBankAcctMiddlewares = [
        initAuthenticateUserType('client'),
        initCheckUserInDb(),
        initValidateFields(reqdFieldsDescription),
        initCreateBankAcct(accountType, idCardType, idCardNumber, acctMobileNo),
      ];
      runMiddlewares(createBankAcctMiddlewares, req, res);
    }],
};

export default user;

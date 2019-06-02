import moment from 'moment';
import generateAcctNo from '../helpers/generateAcctNo';
import Account from '../models/Account';


/**
 * Tests form fields that are required
 * @param [array] requiredFields - variable names of form fields to be validated
 * @param {object} reqdFieldsDescription - number keys
 * with values as user intelligible description of form fields
 * @param {object} response express response object
 *
 * @returns {json} error status code with and object having status code and error string
 * if there's error or undefined if not
 */

const initCreateBankAcct = (accountType, idCardType, idCardNumber, acctMobileNo) => {
  const createNewBankAcct = (req, res) => {
    const { user } = req;
    const {
      firstName,
      lastName,
      email,
      id,
      userMobileNo,
    } = user;

    const accountNumber = generateAcctNo(email, firstName);
    // let account;
    // switch (acctMobileNo) {
    //   case undefined:
    //     account = new Account(id + 1, accountNumber, moment.now(), id, accountType,
    //       idCardType, idCardNumber, userMobileNo);
    //     break;
    //   default:
    //     account = new Account(id + 1, accountNumber, moment.now(), id, accountType,
    //       idCardType, idCardNumber, acctMobileNo);
    //     break;
    // }

    const phoneNumberForAcct = !acctMobileNo ? acctMobileNo : userMobileNo;
    const account = new Account(id + 1, accountNumber, moment.now(), id, accountType,
      idCardType, idCardNumber, phoneNumberForAcct);

    user.accounts.push(account);
    user.noOfAccounts += 1;
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber,
        firstName,
        lastName,
        email,
        type: accountType,
        openingBalance: 0.00,
        idCardType,
        message: `Congrats!, you now have a new ${accountType} account at Banka!`,
      },
    });
  };
  return createNewBankAcct;
};

export default initCreateBankAcct;

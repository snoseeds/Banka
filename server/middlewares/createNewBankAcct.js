import generateAcctNo from '../helpers/generateAcctNo';
import queries from '../PostgreSQL/dbTablesCrudQueries';


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
  const createNewBankAcct = async (req, res) => {
    try {
      const { user } = req;
      const {
        firstname: firstName, lastname: lastName, email, id, mobileno: userMobileNo,
      } = user;
      const accountNumber = generateAcctNo(email, firstName);
      const columnsToBeInsertedArr = ['ownerID', 'email', 'accountNumber', 'type', 'idCardType',
        'idCardNumber', 'acctMobileNo'];
      const valuesToBeInsertedArr = [id, email, accountNumber, accountType, idCardType,
        idCardNumber, !acctMobileNo ? userMobileNo : acctMobileNo];
      await queries.insert('account', columnsToBeInsertedArr, valuesToBeInsertedArr);
      await queries.incrementByOne('client', ['noOfAccounts'], 'email', email);
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
    } catch (error) {
      throw error;
    }
  };
  return createNewBankAcct;
};

export default initCreateBankAcct;

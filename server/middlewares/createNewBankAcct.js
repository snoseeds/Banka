import generateAcctNo from '../helpers/generateAcctNo';
import queries from '../PostgreSQL/dbTablesCrudQueries';

const initCreateBankAcct = (accountType, idCardType, idCardNumber, acctMobileNo) => {
  const createNewBankAcct = async ({ user }, res) => {
    try {
      const { firstname: firstName, lastname: lastName, email, id, mobileno: userMobileNo } = user;
      const accountNumber = generateAcctNo(email, firstName);
      const columnsToBeInsertedArr = ['ownerID', 'email', 'accountNumber', 'type', 'idCardType',
        'idCardNumber', 'acctMobileNo'];
      const valuesToBeInsertedArr = [id, email, accountNumber, accountType, idCardType,
        idCardNumber, !acctMobileNo ? userMobileNo : acctMobileNo];
      await queries.insert('account', columnsToBeInsertedArr, valuesToBeInsertedArr);
      await queries.incrementOrDecrementColsValsByOne('client', '+', ['noOfAccounts'], 'email', email);
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
    } catch (error) { throw error; }
  };
  return createNewBankAcct;
};

export default initCreateBankAcct;

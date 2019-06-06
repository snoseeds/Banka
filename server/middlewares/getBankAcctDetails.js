import Database from '../models/Database';
import issueErrorResponse from '../helpers/issueErrorResponse';

const initGetBankAcctDetails = (accountNumber) => {
  const getBankAcctDetails = (req, res, next) => {
    let accountDetails;
    if (Database.client.some((user) => {
      accountDetails = user.accounts.find(acct => acct.accountNumber === accountNumber);
      return accountDetails;
    })) {
      req.bankAccountDetails = accountDetails;
      return next();
    }
    return issueErrorResponse(res, 404, 'This account number doesn\'t exist on Banka');
  };
  return getBankAcctDetails;
};

export default initGetBankAcctDetails;

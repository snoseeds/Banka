import Database from '../models/Database';

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
    return res.status(404).json({
      status: 404,
      error: 'This account number doesn\'t exist on Banka',
    });
  };
  return getBankAcctDetails;
};

export default initGetBankAcctDetails;

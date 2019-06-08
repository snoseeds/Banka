import initAuthenticateUserType from './authenticateUserType';
import initCheckUserInDb from './checkUserInDb';
import initGetBankAcctDetails from './getBankAcctDetails';

const processReqOfBankAcct = (req, res, next) => {
  const { accountNumber } = req.params;
  const startingMiddlewares = [
    initAuthenticateUserType('admin', 'cashier'),
    initCheckUserInDb(),
    initGetBankAcctDetails(accountNumber),
  ];
  req.middlewaresArr = startingMiddlewares;
  next();
};

export default processReqOfBankAcct;

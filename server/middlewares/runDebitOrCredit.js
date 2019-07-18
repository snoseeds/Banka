import initIsTransactionAmountValid from './isTransactionAmountValid';
import initValidateFields from './validateFormFields';
import initTransactOnBankAcctInDb from './transactOnBankAcctInDb';
// import runMiddlewares from './runMiddlewares';

const initRunDebitOrCredit = (transType, transTypeDescription) => {
  const runDebitOrCredit = (req, res) => {
    const { amount } = req.body;
    const transactionMiddlewares = [
      initValidateFields({ [transTypeDescription]: amount }),
      initIsTransactionAmountValid(parseFloat(amount), transType),
      initTransactOnBankAcctInDb(amount, transType),
    ];
    // runMiddlewares([...req.middlewaresArr, ...transactionMiddlewares], req, res);
    return transactionMiddlewares;
  };
  return runDebitOrCredit;
};

export default initRunDebitOrCredit;

import initIsTransactionAmountValid from './isTransactionAmountValid';
import initValidateFields from './validateFormFields';
import initTransactOnBankAcctInDb from './transactOnBankAcctInDb';

const initRunDebitOrCredit = (transType, transTypeDescription) => {
  const runDebitOrCredit = (req, res) => {
    const { amount } = req.body;
    const transactionMiddlewares = [
      initValidateFields({ [transTypeDescription]: amount }),
      initIsTransactionAmountValid(parseFloat(amount), transType),
      initTransactOnBankAcctInDb(amount, transType),
    ];
    return transactionMiddlewares;
  };
  return runDebitOrCredit;
};

export default initRunDebitOrCredit;

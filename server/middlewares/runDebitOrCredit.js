import async from 'async';
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
    async.series([...req.middlewaresArr, ...transactionMiddlewares]
      .map(mw => mw.bind(null, req, res)));
  };
  return runDebitOrCredit;
};

export default initRunDebitOrCredit;

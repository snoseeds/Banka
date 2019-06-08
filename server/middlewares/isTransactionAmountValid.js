import issueErrorResponse from '../helpers/issueErrorResponse';

const initIsTransactionAmountValid = (num, transactionType) => {
  const isTransactionAmountValid = (req, res, next) => {
    if (typeof num === 'number' && num > 0) {
      return next();
    }
    return issueErrorResponse(res, 400,
      `Amount to be ${transactionType}ed must be a non-zero positive number`);
  };
  return isTransactionAmountValid;
};

export default initIsTransactionAmountValid;

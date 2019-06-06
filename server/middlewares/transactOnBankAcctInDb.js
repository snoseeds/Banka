import Database from '../models/Database';
import Transaction from '../models/Transaction';
import { clipTo2dp, isTransactionAmountValid } from '../helpers/transactionHelpers';
import issueErrorResponse from '../helpers/issueErrorResponse';

const initTransactOnBankAcctInDb = (amount, transactionType) => {
  const transAmount = parseFloat(amount);
  const transactOnBankAcctInDb = (req, res) => {
    const {
      ownerID,
      accountID,
      accountNumber,
      accountBalance,
      transactions,
    } = req.bankAccountDetails;

    const { id } = req.user; // Getting ID of Cashier consumating the credit transaction
    if (isTransactionAmountValid(transAmount)) {
      const newBalance = transactionType === 'credit'
        ? clipTo2dp(parseFloat(accountBalance) + transAmount)
        : clipTo2dp(parseFloat(accountBalance) - transAmount);
      const transactionPayload = {
        transactionId: transactions.length + 1,
        accountNumber,
        amount: transAmount,
        cashier: Number(id),
        transactionType,
      };
      const newCreditTransaction = new Transaction(...Object.values(transactionPayload),
        accountBalance, newBalance);
      Database.client[ownerID - 1].accounts[accountID - 1].transactions.push(newCreditTransaction);
      return res.status(201).json({
        status: 201,
        data: {
          ...transactionPayload,
          accountBalance: newBalance,
        },
      });
    }
    return issueErrorResponse(res, 400,
      `Amount to be ${transactionType}ed must be a non-zero positive number`);
  };
  return transactOnBankAcctInDb;
};

export default initTransactOnBankAcctInDb;

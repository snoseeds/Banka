import Database from '../models/Database';
import Transaction from '../models/Transaction';
import { calculateBalance } from '../helpers/transactionHelpers';

const initTransactOnBankAcctInDb = (amount, transactionType) => {
  const transAmount = parseFloat(amount);
  const transactOnBankAcctInDb = (req, res) => {
    const {
      ownerID, accountID, accountNumber, accountBalance, transactions,
    } = req.bankAccountDetails;
    const { id } = req.user; // Getting ID of Cashier consumating the credit transaction
    const newBalance = calculateBalance(accountBalance, transAmount, transactionType);
    const transProps = {
      transactionId: transactions.length + 1,
      accountNumber,
      amount: transAmount,
      cashier: Number(id),
      transactionType,
    };
    const newTrans = new Transaction(...Object.values(transProps), accountBalance, newBalance);
    Database.client[ownerID - 1].accounts[accountID - 1].transactions.push(newTrans);
    return res.status(201).json({
      status: 201,
      data: { ...transProps, accountBalance: newBalance },
    });
  };
  return transactOnBankAcctInDb;
};

export default initTransactOnBankAcctInDb;

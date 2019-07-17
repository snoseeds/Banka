import queries from '../PostgreSQL/dbTablesCrudQueries';
import { calculateBalance } from '../helpers/transactionHelpers';

const initTransactOnBankAcctInDb = (amount, transactionType) => {
  const transactOnBankAcctInDb = async (req, res) => {
    try {
      const transAmount = parseFloat(amount);
      const {
        accountnumber: accountNumber, accountbalance: accountBalance,
      } = req.bankAccountDetails;
      const { id } = req.user; // Getting ID of Cashier consumating the credit transaction
      const newBalance = calculateBalance(accountBalance, transAmount, transactionType);
      const transColsAndVals = {
        accountNumber,
        amount: transAmount,
        cashier: Number(id),
        transactionType,
      };
      const colsArr = Object.keys(transColsAndVals).concat(['oldBalance', 'newBalance']);
      const valsArr = Object.values(transColsAndVals).concat([accountBalance, newBalance]);
      const { id: tid } = await queries.insert('transaction', colsArr, valsArr, ['id']);
      await queries.updateColsVals('account', ['accountBalance'], [newBalance], 'accountNumber', accountNumber);
      return res.status(201).json({
        status: 201,
        data: { transactionId: Number(tid), ...transColsAndVals, accountBalance: newBalance },
      });
    } catch (error) { throw error; }
  };
  return transactOnBankAcctInDb;
};

export default initTransactOnBankAcctInDb;

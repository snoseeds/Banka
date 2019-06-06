import moment from 'moment';

class Transaction {
  constructor(transactionId, accountNumber, amount, cashierID,
    transactionType, oldBalance, newBalance) {
    this.id = transactionId;
    this.createdOn = moment.now();
    this.accountNumber = accountNumber;
    this.amount = amount;
    this.cashier = cashierID;
    this.type = transactionType;
    this.oldBalance = oldBalance;
    this.newBalance = newBalance;
  }
}

export default Transaction;

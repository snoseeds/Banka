// Doesn't round up while giving amount to 2dp, just clips to 2 dp,
// to prevent calculating balances that add little amount that the client doensn't own
const clipTo2dp = (amt) => {
  const str = amt.toFixed(3);
  return str.slice(0, str.length - 1);
};

const debit = (balanceInAcct, amountOfTransaction) => {
  const minimumPermissibleBalance = 0;
  if (balanceInAcct - amountOfTransaction < minimumPermissibleBalance) {
    const errorObj = {
      name: 403,
      message: 'Insufficient account balance for the debit amount',
    };
    throw errorObj;
  }
  return clipTo2dp(parseFloat(balanceInAcct) - amountOfTransaction);
};

const calculateBalance = (accountBalance, transAmount, transactionType) => {
  const newBalance = transactionType === 'credit'
    ? clipTo2dp(parseFloat(accountBalance) + transAmount)
    : debit(accountBalance, transAmount);
  return newBalance;
};

export { clipTo2dp, calculateBalance };

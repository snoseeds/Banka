// Doesn't round up while giving amount to 2dp, just clips to 2 dp,
// to prevent calculating balances that add little amount that the client doensn't own
const clipTo2dp = (amt, str = amt.toFixed(3)) => str.slice(0, str.length - 1);

const calculateBalance = (accountBalance, transAmount, transactionType) => {
  const newBalance = transactionType === 'credit'
    ? clipTo2dp(parseFloat(accountBalance) + transAmount)
    : clipTo2dp(parseFloat(accountBalance) - transAmount);
  return newBalance;
};

export { clipTo2dp, calculateBalance };

const isTransactionAmountValid = num => typeof num === 'number' && num > 0;

// Doesn't round up while giving amount to 2dp, just clips to 2 dp,
// to prevent calculating balances that add little amount that the client doensn't own
const clipTo2dp = (amt, str = amt.toFixed(3)) => str.slice(0, str.length - 1);

export { clipTo2dp, isTransactionAmountValid };

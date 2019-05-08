class Account {
  constructor(id, accountNumber, createdOn, userID, accountType,
    idCardType, idCardNumber, mobileNo) {
    this.id = id;
    this.accountNumber = accountNumber;
    this.createdOn = createdOn;
    this.owner = userID;
    this.type = accountType; // savings, current
    this.status = 'draft'; // draft, active, or dormant
    this.balance = 0.00;
    this.idCardType = idCardType;
    this.idCardNumber = idCardNumber;
    this.mobileNo = mobileNo;
    this.lastWithdrawal = 'no transactions yet';
    this.lastDeposit = 'no transactions yet';
  }
}
export default Account;

import Database from '../models/Database';

const changeAcctStatusInDb = (req, res) => {
  const {
    ownerID,
    status,
    accountID,
    accountNumber,
  } = req.bankAccountDetails;
  const newStatus = status === 'active' ? 'dormant' : 'active';
  Database.client[ownerID - 1].accounts[accountID - 1].status = newStatus;
  return res.status(201).json({
    status: 201,
    data: {
      status: newStatus,
      accountNumber,
      message: `This bank account status has been changed to ${newStatus}`,
    },
  });
};

export default changeAcctStatusInDb;

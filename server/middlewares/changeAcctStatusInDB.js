import Database from '../models/Database';


const changeAcctStatusInDb = (req, res) => {
  const {
    userID,
    status,
    id,
    accountNumber,
  } = req.bankAccountDetails;
  const newStatus = status === 'active' ? 'dormant' : 'active';
  Database.client[userID - 1].accounts[id - 1].status = newStatus;
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

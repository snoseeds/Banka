import queries from '../PostgreSQL/dbTablesCrudQueries';

const changeAcctStatusInDb = async (req, res) => {
  try {
    const {
      status,
      accountid: accountID,
      accountnumber: accountNumber,
    } = req.bankAccountDetails;
    const newStatus = status === 'active' ? 'dormant' : 'active';
    await queries.updateColsVals('account', ['status'], [newStatus], 'accountID', accountID);
    return res.status(201).json({
      status: 201,
      data: {
        status: newStatus,
        accountNumber,
        message: `This bank account status has been changed to ${newStatus}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default changeAcctStatusInDb;

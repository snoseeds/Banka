import queries from '../PostgreSQL/dbTablesCrudQueries';

const changeAcctStatusInDbWrapper = () => {
// no try and catch block despite asynchronicity because nature of where this function uses its
// parameters can never result in an error repsonse irrespective or the arguments supplied
// Moreover, if their accountNumber is non-existent, previous middlewares would have rejected
// the request with the appropriate error
  const changeAcctStatusInDb = async (req, res) => {
    const {
      status,
      accountnumber: accountNumber,
    } = req.bankAccountDetails;
    const newStatus = status === 'active' ? 'dormant' : 'active';
    await queries.updateColsVals('account', ['status'], [newStatus], 'accountNumber', accountNumber);
    return res.status(201).json({
      status: 201,
      data: {
        status: newStatus,
        accountNumber,
        message: `This bank account status has been changed to ${newStatus}`,
      },
    });
  };
  return [changeAcctStatusInDb];
};

export default changeAcctStatusInDbWrapper;

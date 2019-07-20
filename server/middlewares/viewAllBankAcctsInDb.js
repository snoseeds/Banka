import queries from '../PostgreSQL/dbTablesCrudQueries';

const viewAllBankAcctsWrapper = () => {
  // no try and catch block despite asynchronicity because the nature of this function
  // doesn't use any external parameter.
  // Moreover, if the request is bad, previous middlewares would have rejected
  // the request with the appropriate error
  const viewAllBankAccts = async (req, res) => {
    const { status } = req.query;
    return res.status(200).json({
      status: 200,
      data: await queries.getRowsOfColumns('account',
        ['createdOn', 'accountNumber', 'email', 'type', 'status', 'accountBalance'],
        status ? 'status' : undefined, status,
        ['createdOn', 'accountNumber', 'ownerEmail', 'type', 'status', 'balance']),
    });
  };
  return [viewAllBankAccts];
};

export default viewAllBankAcctsWrapper;

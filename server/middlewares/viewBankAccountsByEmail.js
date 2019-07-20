import queries from '../PostgreSQL/dbTablesCrudQueries';

const viewBankAccountsByEmailWrapper = () => {
  // no try and catch block despite asynchronicity because the nature of where this function uses
  // its parameters can never result in an error repsonse irrespective or the arguments supplied
  // Moreover, if their accountNumber is non-existent, previous middlewares would have rejected
  // the request with the appropriate error
  const viewBankAccountsByEmail = async (req, res) => {
    const { email } = req.params;
    return res.status(200).json({
      status: 200,
      data: await queries.getRowsOfColumns('account',
        ['createdOn', 'accountNumber', 'type', 'status', 'accountBalance'],
        'email', email,
        ['createdOn', 'accountNumber', 'type', 'status', 'balance']),
    });
  };
  return [viewBankAccountsByEmail];
};

export default viewBankAccountsByEmailWrapper;

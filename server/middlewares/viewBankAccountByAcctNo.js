import queries from '../PostgreSQL/dbTablesCrudQueries';

const viewBankAccountByAcctNoWrapper = () => {
  // no try and catch block despite asynchronicity because the nature of where this function uses
  // its parameters can never result in an error repsonse irrespective or the arguments supplied
  // Moreover, if the transactionId is non-existent, previous middlewares would have rejected
  // the request with the appropriate error
  const viewBankAccountByAcctNo = async (req, res) => {
    const { accountNumber } = req.params;
    const [accountNumberObj] = await queries.getRowsOfColumns('account',
      ['createdOn', 'accountNumber', 'email', 'type', 'status', 'accountBalance'],
      'accountNumber', accountNumber,
      ['createdOn', 'accountNumber', 'ownerEmail', 'type', 'status', 'balance']);
    return res.status(200).json({
      status: 200,
      data: { ...accountNumberObj },
    });
  };
  return [viewBankAccountByAcctNo];
};

export default viewBankAccountByAcctNoWrapper;

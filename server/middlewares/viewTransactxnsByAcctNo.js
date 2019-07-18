import queries from '../PostgreSQL/dbTablesCrudQueries';

const viewTransactxnsByAcctNoWrapper = () => {
  // no try and catch block despite asynchronicity because the nature of where this function uses
  // its parameters can never result in an error repsonse irrespective or the arguments supplied
  // Moreover, if their accountNumber is non-existent, previous middlewares would have rejected
  // the request with the appropriate error
  const viewTransactxnsByAcctNo = async (req, res) => {
    const { accountNumber } = req.params;
    return res.status(200).json({
      status: 200,
      data: await queries.getRowsOfColumns('transaction',
        ['id', 'createdOn', 'transactionType', 'accountNumber', 'amount', 'oldBalance', 'newBalance'],
        'accountNumber', accountNumber,
        ['transactionId', 'createdOn', 'type', 'accountNumber', 'amount', 'oldBalance', 'newBalance']),
    });
  };
  return [viewTransactxnsByAcctNo];
};

export default viewTransactxnsByAcctNoWrapper;

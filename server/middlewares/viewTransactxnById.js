import queries from '../PostgreSQL/dbTablesCrudQueries';

const viewTransactxnByIdWrapper = () => {
  // no try and catch block despite asynchronicity because the nature of where this function uses
  // its parameters can never result in an error repsonse irrespective or the arguments supplied
  // Moreover, if the transactionId is non-existent, previous middlewares would have rejected
  // the request with the appropriate error
  const viewTransactxnById = async (req, res) => {
    const { transactionId } = req.params;
    const [transactionObj] = await queries.getRowsOfColumns('transaction',
      ['id', 'createdOn', 'transactionType', 'accountNumber', 'amount', 'oldBalance', 'newBalance'],
      'id', Number(transactionId),
      ['transactionId', 'createdOn', 'type', 'accountNumber', 'amount', 'oldBalance', 'newBalance']);
    return res.status(200).json({
      status: 200,
      data: { ...transactionObj },
    });
  };
  return [viewTransactxnById];
};

export default viewTransactxnByIdWrapper;

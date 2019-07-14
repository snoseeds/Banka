import queries from '../PostgreSQL/dbTablesCrudQueries';
import archiveDeletedRows from '../helpers/archiveDeletedRows';


// no try andf catch block despite asynchronicity because nature of where this function uses its
// parameters can never result in an error repsonse irrespective or the arguments supplied
const deleteBankAcctInDb = async (req, res) => {
  const {
    ownerid: ownerID,
    accountnumber: accountNumber,
  } = req.bankAccountDetails;
  // Hierarcy of deletion done not to violate referential integrity
  const deletedAcctTrxnsObjsArr = await queries.deleteRowsAndReturnCols('transaction', 'accountNumber', accountNumber);
  const deletedBankAcctObjArr = await queries.deleteRowsAndReturnCols('account', 'accountNumber', accountNumber);
  // Hierarchy of archiving done to conform to referential integrity
  await archiveDeletedRows('deletedBankAccount', deletedBankAcctObjArr);
  await archiveDeletedRows('deletedTransaction', deletedAcctTrxnsObjsArr);
  await queries.incrementOrDecrementColsValsByOne('client', '-', ['noOfAccounts'], 'id', ownerID);
  return res.status(201).json({
    status: 201,
    message: 'Account successfully deleted',
  });
};

export default deleteBankAcctInDb;

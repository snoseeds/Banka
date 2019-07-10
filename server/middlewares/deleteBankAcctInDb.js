import queries from '../PostgreSQL/dbTablesCrudQueries';
import archiveDeletedRows from '../helpers/archiveDeletedRows';


const deleteBankAcctInDb = async (req, res) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export default deleteBankAcctInDb;

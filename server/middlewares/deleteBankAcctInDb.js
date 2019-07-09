import queries from '../PostgreSQL/dbTablesCrudQueries';
import archiveDeletedBankAcct from '../helpers/archiveDeletedBankAcct';


const deleteBankAcctInDb = async (req, res) => {
  try {
    const {
      ownerid: ownerID,
      accountnumber: accountNumber,
    } = req.bankAccountDetails;
    const deletedBankAcctObj = await queries.deleteRowAndReturnCols('account', 'accountNumber', accountNumber);
    await archiveDeletedBankAcct(deletedBankAcctObj);
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

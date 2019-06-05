import Database from '../models/Database';
import updateArrObjsIds from '../helpers/updateArrObjsIds';
import archiveDeletedBankAcct from '../helpers/archiveDeletedBankAcct';


const deleteBankAcctInDb = (req, res) => {
  const {
    ownerID,
    accountID,
  } = req.bankAccountDetails;
  const [deletedBankAcct] = Database.client[ownerID - 1].accounts.splice(accountID - 1, 1);
  Database.client[ownerID - 1].accounts = updateArrObjsIds(Database.client[ownerID - 1].accounts, 'accountID');
  archiveDeletedBankAcct(deletedBankAcct, ownerID);
  return res.status(201).json({
    status: 201,
    message: 'Account successfully deleted',
  });
};

export default deleteBankAcctInDb;

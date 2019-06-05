import Database from '../models/Database';
import updateArrObjsIds from './updateArrObjsIds';

const archiveDeletedBankAcct = (deletedBankAcct, ownerID) => {
  if (Object.prototype.hasOwnProperty.call(Database.deletedBankAccts, `${ownerID}`)) {
    Database.deletedBankAccts[ownerID].push(deletedBankAcct);
  } else {
    Database.deletedBankAccts[ownerID] = [deletedBankAcct];
  }
  Database.deletedBankAccts[ownerID] = updateArrObjsIds(Database.deletedBankAccts[ownerID], 'accountID');
};

export default archiveDeletedBankAcct;

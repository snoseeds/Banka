import queries from '../PostgreSQL/dbTablesCrudQueries';

const archiveDeletedBankAcct = async (deletedBankAcctObj) => {
  try {
    const columnsToBeInsertedArr = Object.keys(deletedBankAcctObj);
    const valuesToBeInsertedArr = Object.values(deletedBankAcctObj);
    await queries.insert('deletedBankAccount', columnsToBeInsertedArr, valuesToBeInsertedArr);
  } catch (error) {
    throw error;
  }
};

export default archiveDeletedBankAcct;

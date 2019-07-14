import queries from '../PostgreSQL/dbTablesCrudQueries';

const archiveDeletedRows = async (table, tableRowsArray) => {
  // eslint-disable-next-line consistent-return
  tableRowsArray.forEach(async (tableRow) => {
    try {
      const columnsToBeInsertedArr = Object.keys(tableRow);
      const valuesToBeInsertedArr = Object.values(tableRow);
      await queries.insert(`${table}`, columnsToBeInsertedArr, valuesToBeInsertedArr);
    } catch (error) {
      return error;
    }
  });
};

export default archiveDeletedRows;

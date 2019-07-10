import queries from '../PostgreSQL/dbTablesCrudQueries';

const archiveDeletedRows = async (table, tableRowsArray) => {
  try {
    await tableRowsArray.forEach(async (tableRow) => {
      try {
        const columnsToBeInsertedArr = Object.keys(tableRow);
        const valuesToBeInsertedArr = Object.values(tableRow);
        await queries.insert(`${table}`, columnsToBeInsertedArr, valuesToBeInsertedArr);
      } catch (error) {
        throw error;
      }
    });
  } catch (error) {
    throw error;
  }
};

export default archiveDeletedRows;

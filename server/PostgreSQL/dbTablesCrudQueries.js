import { pool, logger } from './connectToDb';
import makeSysVars from '../helpers/makeSysVars';

const queries = {
  async insert(table, columnsToBeInsertedArr, valuesToBeInsertedArr, columnsToBeReturnedArr) {
    const systemVarsForInsertionValues = makeSysVars(valuesToBeInsertedArr.length);
    const query = `INSERT INTO ${table}(${columnsToBeInsertedArr.join(', ')}) `
      + `VALUES(${systemVarsForInsertionValues}) returning *`;
    const { rows } = await pool.query(query, valuesToBeInsertedArr);
    const returnColsObject = (colsArr, newUserObj) => colsArr
      .reduce((obj, col) => ({ ...obj, [col]: newUserObj[col.toLowerCase()] }), {});
    const fieldsToBeReturnedObj = columnsToBeReturnedArr
      ? returnColsObject(columnsToBeReturnedArr, rows[0])
      : rows[0];
    return fieldsToBeReturnedObj;
  },

  async getRowsCount(table) {
    const query = `SELECT COUNT(*) FROM ${table}`;
    const { rows } = await pool.query(query);
    const [{ count }] = rows;
    return Number(count);
  },

  // Specifying no of columns to be retrieved from database
  // under specified or unspecified conditions to determine the number of returned rows
  async getRowsOfColumns(table, columnsArray, matchingColumn = '1', matchingColumnValue = '1') {
    const sysVarForMatchingColumnValue = makeSysVars(1);
    const query = `SELECT ${columnsArray.join(', ')} FROM ${table} `
      + `WHERE ${matchingColumn} = ${sysVarForMatchingColumnValue}`;
    const argumentsArr = [matchingColumnValue];
    const { rows } = await pool.query(query, argumentsArr);
    return rows;
  },

  async incrementByOne(table, columnsArray, matchingColumn = '1', matchingColumnValue = '1') {
    const sysVarForColValue = makeSysVars(1);
    const query = `UPDATE ${table} SET ${columnsArray.map(col => `${col} = ${col} + 1`).join(', ')} `
      + `WHERE ${matchingColumn} = ${sysVarForColValue}`;
    const argumentsArr = [matchingColumnValue];
    const updateResult = await pool.query(query, argumentsArr);
  },
};

export default queries;

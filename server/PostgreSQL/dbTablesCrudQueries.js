import { pool, logger } from './connectToDb';
import makeSysVars from '../helpers/makeSysVars';
import changeKeysOfObjsInArr from '../helpers/changeKeysOfObjsInArr';

const queries = {
  async insert(table, columnsToBeInsertedArr, valuesToBeInsertedArr, columnsToBeReturnedArr = ['*']) {
    try {
      const systemVarsForInsertionValues = makeSysVars(valuesToBeInsertedArr.length);
      const query = `INSERT INTO ${table}(${columnsToBeInsertedArr.join(', ')}) `
        + `VALUES(${systemVarsForInsertionValues}) returning ${columnsToBeReturnedArr.join(', ')}`;
      const { rows } = await pool.query(query, valuesToBeInsertedArr);
      const [objWithCamelCaseKeys] = columnsToBeReturnedArr[0] === '*'
        ? changeKeysOfObjsInArr(rows, columnsToBeInsertedArr)
        : changeKeysOfObjsInArr(rows, columnsToBeReturnedArr);
      return objWithCamelCaseKeys;
    } catch (error) { throw error; }
  },

  async getRowsCount(table, matchingColumn = '1', matchingColumnValue = '1') {
    const sysVarForMatchingColumnValue = makeSysVars(1);
    const query = `SELECT COUNT(*) FROM ${table} `
      + `WHERE ${matchingColumn} = ${sysVarForMatchingColumnValue}`;
    const argumentsArr = [matchingColumnValue];
    const { rows } = await pool.query(query, argumentsArr);
    const [{ count }] = rows;
    return Number(count);
  },

  // Specifying no of columns to be retrieved from database
  // under specified or unspecified conditions to determine the number of returned rows
  async getRowsOfColumns(table, columnsArray, matchingColumn = '1', matchingColumnValue = '1', columnsToBeReturnedArr = null) {
    const sysVarForMatchingColumnValue = makeSysVars(1);
    const query = `SELECT ${columnsArray.join(', ')} FROM ${table} `
      + `WHERE ${matchingColumn} = ${sysVarForMatchingColumnValue}`;
    const argumentsArr = [matchingColumnValue];
    const { rows } = await pool.query(query, argumentsArr);
    // Returns lower case column values when columnsToBeReturnedArr isn't supplied,
    // but returns the camel case of the specified columns when columnsToBeReturnedArr is given
    const objsWithCamelCaseKeysArr = columnsToBeReturnedArr === null
      ? rows : changeKeysOfObjsInArr(rows, columnsToBeReturnedArr);
    return objsWithCamelCaseKeysArr;
  },

  async incrementOrDecrementColsValsByOne(table, plusOrMinus, columnsArray,
    matchingColumn, matchingColumnValue) {
    const sysVarForColValue = makeSysVars(1);
    const query = `UPDATE ${table} SET ${columnsArray.map(col => `${col} = ${col} ${plusOrMinus} 1`).join(', ')} `
      + `WHERE ${matchingColumn} = ${sysVarForColValue}`;
    const argumentsArr = [matchingColumnValue];
    await pool.query(query, argumentsArr);
  },

  async updateColsVals(table, columnsArray, updatedValsArray,
    matchingColumn, matchingColumnValue) {
    const sysVarForColValue = makeSysVars(1, columnsArray.length);
    const query = `UPDATE ${table} SET ${columnsArray.map((col, idx) => `${col} = ${makeSysVars(1, idx)}`).join(', ')} `
      + `WHERE ${matchingColumn} = ${sysVarForColValue}`;
    const argumentsArr = [...updatedValsArray, matchingColumnValue];
    await pool.query(query, argumentsArr);
  },

  async deleteRowsAndReturnCols(table, matchingColumn, matchingColumnValue, columnsToBeReturnedArr = ['*']) {
    const sysVarForColValue = makeSysVars(1);
    const query = `DELETE FROM ${table} WHERE ${matchingColumn} = ${sysVarForColValue} `
      + `returning ${columnsToBeReturnedArr.join(', ')}`;
    const { rows } = await pool.query(query, [matchingColumnValue]);
    // Returns lower case column values when columnsToBeReturnedArr isn't supplied,
    // but returns the camel case of the specified columns when columnsToBeReturnedArr is given,
    // no inconsistency once we're just passing the returned obj in the former (default) case
    // to be inserted into another table (an operation that normalizes query string to lowercase)
    const objsWithCamelCaseKeysArr = columnsToBeReturnedArr[0] === '*'
      ? rows : changeKeysOfObjsInArr(rows, columnsToBeReturnedArr);
    return objsWithCamelCaseKeysArr;
  },

};

export default queries;

/* eslint-disable no-undef */
import { expect } from 'chai';
import queries from '../PostgreSQL/dbTablesCrudQueries';
import archiveDeletedRows from '../helpers/archiveDeletedRows';
import initCreateNewBankAcct from '../middlewares/createNewBankAcct';

describe('Unit Testing lines of code not exposed in integration tests', () => {
  describe('Testing deleteRowsAndReturnCols method on query object', async () => {
    it('should return specified columns when record(s) is(are) deleted from a db table', async () => {
      const rowsOfColsFromDeletedRecord = await queries
        .deleteRowsAndReturnCols('deletedTransaction', 'id', 2, ['id', 'amount', 'transactionType']);
      const colsFromDeletedRecord = rowsOfColsFromDeletedRecord[0];
      expect(colsFromDeletedRecord).to.be.an('object');
      expect(colsFromDeletedRecord).to.have.property('id');
      expect(colsFromDeletedRecord).to.have.property('amount');
      expect(colsFromDeletedRecord).to.have.property('transactionType');
      expect(Object.entries(colsFromDeletedRecord).length).to.equal(3);
      expect(colsFromDeletedRecord.amount).to.equal('40000.85');
    });
  });

  describe('Testing error object from createNewBankAcct middleware', () => {
    it('should return the right error when referential integrity is violated', async () => {
      try {
        const req = {
          user: {
            firstname: 'Jide',
            lastname: 'Tade',
            email: 'jidtad@gmail.com',
            id: 25,
          },
        };
        const createNewBankAcct = initCreateNewBankAcct('savings', '1', 'A25896362', '+23487676767');
        await createNewBankAcct(req);
      } catch (error) {
        expect(error.name).to.equal('error');
        expect(error.detail).to.equal('Key (ownerid)=(25) is not present in table "client".');
      }
    });
  });

  describe('Testing error object from archiveDeletedRows helper function', () => {
    it('should return the right error when the specified table doesn\'t exist', async () => {
      try {
        await archiveDeletedRows('random', [{ firstName: 'Jide', lastName: 'Tade', email: 'pass@test.com' }]);
      } catch (error) {
        expect(error.name).to.equal('Reference Error');
        expect(error.error).to.equal('relation "random" does not exist');
      }
    });
  });
});

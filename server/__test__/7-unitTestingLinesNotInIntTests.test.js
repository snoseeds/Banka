/* eslint-disable no-undef */
import { expect } from 'chai';
import queries from '../PostgreSQL/dbTablesCrudQueries';
import archiveDeletedRows from '../helpers/archiveDeletedRows';
import initCreateNewBankAcct from '../middlewares/createNewBankAcct';
import { testVariablesObj } from '../config/config';

describe('Unit Testing lines of code not exposed in integration tests', () => {
  describe('Testing deleteRowsAndReturnCols method on query object', () => {
    before((done) => {
      queries.deleteRowsAndReturnCols('deletedTransaction', 'id', 1, ['id', 'amount', 'transactionType'])
        .then(([deletedRecordColumns]) => {
          testVariablesObj.deletedRecordColumns = deletedRecordColumns;
          done();
        });
    });
    it('should return specified columns when record(s) is(are) deleted from a db table', () => {
      expect(testVariablesObj.deletedRecordColumns).to.be.an('object');
      expect(testVariablesObj.deletedRecordColumns).to.have.property('id');
      expect(testVariablesObj.deletedRecordColumns).to.have.property('amount');
      expect(testVariablesObj.deletedRecordColumns).to.have.property('transactionType');
      expect(Object.entries(testVariablesObj.deletedRecordColumns).length).to.equal(3);
      expect(testVariablesObj.deletedRecordColumns.amount).to.equal('45000.89');
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

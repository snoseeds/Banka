/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';
import { testVariablesObj } from '../config/config';

chai.use(chaiHttp);

describe('Testing User, Staff, and Admin Controller for endpoints that the trio are privileged to use', () => {
  before((done) => {
    testVariablesObj.bankAcctTrxnsUrl = `/api/v1/accounts/${testVariablesObj.testAccountNumber}/transactions`;
    testVariablesObj.viewSingleBankAcctUrl = `/api/v1/accounts/${testVariablesObj.testAccountNumber}`;
    done();
  });
  let clientSignInToken;
  let staffSignInToken;
  let adminSignInToken;
  const clientSignInUrl = '/api/v1/auth/signin';
  const staffSignInUrl = '/api/v1/auth/staff/signin';
  const adminSignInUrl = '/api/v1/auth/admin/signin';
  const nonExistentAcctNo = '343922115'; // Nine digits to totally prevent matching a real acct no

  describe('Testing view transactions on a user\'s particular bank account controller', () => {
    describe('Testing view transactions on a user\'s particular bank account controller for a Logged in User', () => {
      it('should return the bank account transactions if the client is authenticated and if account number exists', (done) => {
        chai.request(app)
          .post(clientSignInUrl)
          .send({
            email: 'test@test.com',
            password: 'ajulo2oluwawa',
            typeOfUser: 'client',
          })
          .end((error, response) => {
            clientSignInToken = response.body.data.token; // Client signup token would work the same as well
            chai.request(app)
              .get(testVariablesObj.bankAcctTrxnsUrl)
              .set('authorization', `Bearer ${clientSignInToken}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('array');
                done();
              });
          });
      });

      it('should not return bank account transactions if the user token is invalid', (done) => {
        chai.request(app)
          .get(testVariablesObj.bankAcctTrxnsUrl)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return bank account transactions if the accountNumber does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/accounts/${nonExistentAcctNo}/transactions`)
          .set('authorization', `Bearer ${clientSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This account number doesn\'t exist on Banka');
            done();
          });
      });
    });

    describe('Testing view transactions on a user\'s particular bank account controller for a Logged in Staff (cashier)', () => {
      it('should return the bank account transactions if the client is authenticated and if account number exists', (done) => {
        chai.request(app)
          .post(staffSignInUrl)
          .send({
            email: 'alliafunkun@gmail.com',
            password: 'ajulo42oluwawa',
            typeOfUser: 'cashier',
          })
          .end((error, response) => {
            staffSignInToken = response.body.data.token;
            chai.request(app)
              .get(testVariablesObj.bankAcctTrxnsUrl)
              .set('authorization', `Bearer ${staffSignInToken}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('array');
                done();
              });
          });
      });

      it('should not return bank account transactions if the user token is invalid', (done) => {
        chai.request(app)
          .get(testVariablesObj.bankAcctTrxnsUrl)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return bank account transactions if the accountNumber does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/accounts/${nonExistentAcctNo}/transactions`)
          .set('authorization', `Bearer ${staffSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This account number doesn\'t exist on Banka');
            done();
          });
      });
    });

    describe('Testing view transactions on a user\'s particular bank account controller for a Logged in Admin', () => {
      it('should return the bank account transactions if the admin is authenticated and if account number exists', (done) => {
        chai.request(app)
          .post(adminSignInUrl)
          .send({
            email: 'yusikelebe@gmail.com',
            password: 'ajulo42oluwawa',
            typeOfUser: 'admin',
          })
          .end((error, response) => {
            adminSignInToken = response.body.data.token;
            chai.request(app)
              .get(testVariablesObj.bankAcctTrxnsUrl)
              .set('authorization', `Bearer ${adminSignInToken}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('array');
                done();
              });
          });
      });

      it('should not return bank account transactions if the user token is invalid', (done) => {
        chai.request(app)
          .get(testVariablesObj.bankAcctTrxnsUrl)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });
    
      it('should not return bank account transactions if the accountNumber does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/accounts/${nonExistentAcctNo}/transactions`)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This account number doesn\'t exist on Banka');
            done();
          });
      });
    });
  });

  describe('Testing view specific transaction corresponding to a transaction id controller', () => {
    const transactionId = '1';
    const nonExistentTransactionId = '25';
    describe('Testing view specific transaction corresponding to a transaction id controller for a Logged in User', () => {
      it('should return the specific transaction if the client is authenticated and the transaction id exists', (done) => {
        chai.request(app)
          .get(`/api/v1/transactions/${transactionId}`)
          .set('authorization', `Bearer ${clientSignInToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });

      it('should not return specific transaction if the user token is invalid', (done) => {
        chai.request(app)
          .get(`/api/v1/transactions/${transactionId}`)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return specific transaction if the transactionId does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/transactions/${nonExistentTransactionId}`)
          .set('authorization', `Bearer ${clientSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This transaction id doesn\'t exist on Banka');
            done();
          });
      });
    });
  
    describe('Testing view specific transaction corresponding to a transaction id controller for a Logged in Staff (cashier)', () => {
      it('should return the specific transaction if the cashier is authenticated and the transaction id exists', (done) => {
        chai.request(app)
          .get(`/api/v1/transactions/${transactionId}`)
          .set('authorization', `Bearer ${staffSignInToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });

      it('should not return specific transaction if the cashier token is invalid', (done) => {
        chai.request(app)
          .get(`/api/v1/transactions/${transactionId}`)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return specific transaction if the transactionId does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/transactions/${nonExistentTransactionId}`)
          .set('authorization', `Bearer ${staffSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This transaction id doesn\'t exist on Banka');
            done();
          });
      });
    });
  
    describe('Testing view specific transaction corresponding to a transaction id controller for a Logged in Admin', () => {
      it('should return the specific transaction if the admin is authenticated and the transaction id exists', (done) => {
        chai.request(app)
          .get(`/api/v1/transactions/${transactionId}`)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });

      it('should not return specific transaction if the admin token is invalid', (done) => {
        chai.request(app)
          .get(`/api/v1/transactions/${transactionId}`)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return specific transaction if the transactionId does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/transactions/${nonExistentTransactionId}`)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This transaction id doesn\'t exist on Banka');
            done();
          });
      });
    });
  });

  describe('Testing view all bank accounts of a user with particular email address controller', () => {
    const email = 'test@test.com';
    const nonExistentUserEmail = 'nonexistent@null.com';
    const viewAllBankAcctsUrl = `/api/v1/user/${email}/accounts`;
    describe('Testing view all bank accounts of a user with particular email address controller for a Logged in User', () => {
      it('should return all the bank accounts if the client is authenticated and the email address exists', (done) => {
        chai.request(app)
          .get(viewAllBankAcctsUrl)
          .set('authorization', `Bearer ${clientSignInToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
            expect(res.body.data[0]).to.have.property('createdOn');
            expect(res.body.data[0]).to.have.property('accountNumber');
            expect(res.body.data[0]).to.have.property('type');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('balance');
            expect(res.body.data[1]).to.be.an('object');
            expect(res.body.data[1]).to.have.property('createdOn');
            expect(res.body.data[1]).to.have.property('accountNumber');
            expect(res.body.data[1]).to.have.property('type');
            expect(res.body.data[1]).to.have.property('status');
            expect(res.body.data[1]).to.have.property('balance');
            done();
          });
      });

      it('should not return bank accounts if the user token is invalid', (done) => {
        chai.request(app)
          .get(viewAllBankAcctsUrl)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return bank accounts if the email address does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/user/${nonExistentUserEmail}/accounts`)
          .set('authorization', `Bearer ${clientSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This email address doesn\'t exist on Banka');
            done();
          });
      });
    });

    describe('Testing view all bank accounts of a user with particular email address controller for a Logged in Staff (cashier)', () => {
      it('should return all the bank accounts if the cashier is authenticated and the email address exists', (done) => {
        chai.request(app)
          .get(viewAllBankAcctsUrl)
          .set('authorization', `Bearer ${staffSignInToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
            expect(res.body.data[0]).to.have.property('createdOn');
            expect(res.body.data[0]).to.have.property('accountNumber');
            expect(res.body.data[0]).to.have.property('type');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('balance');
            expect(res.body.data[1]).to.be.an('object');
            expect(res.body.data[1]).to.have.property('createdOn');
            expect(res.body.data[1]).to.have.property('accountNumber');
            expect(res.body.data[1]).to.have.property('type');
            expect(res.body.data[1]).to.have.property('status');
            expect(res.body.data[1]).to.have.property('balance');
            done();
          });
      });

      it('should not return bank accounts if the staff token is invalid', (done) => {
        chai.request(app)
          .get(viewAllBankAcctsUrl)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return bank accounts if the email address does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/user/${nonExistentUserEmail}/accounts`)
          .set('authorization', `Bearer ${staffSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This email address doesn\'t exist on Banka');
            done();
          });
      });
    });

    describe('Testing view all bank accounts of a user with particular email address controller for a Logged in Admin', () => {
      it('should return all the bank accounts if the admin is authenticated and the email address exists', (done) => {
        chai.request(app)
          .get(viewAllBankAcctsUrl)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
            expect(res.body.data[0]).to.have.property('createdOn');
            expect(res.body.data[0]).to.have.property('accountNumber');
            expect(res.body.data[0]).to.have.property('type');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('balance');
            expect(res.body.data[1]).to.be.an('object');
            expect(res.body.data[1]).to.have.property('createdOn');
            expect(res.body.data[1]).to.have.property('accountNumber');
            expect(res.body.data[1]).to.have.property('type');
            expect(res.body.data[1]).to.have.property('status');
            expect(res.body.data[1]).to.have.property('balance');
            done();
          });
      });

      it('should not return bank accounts if the admin token is invalid', (done) => {
        chai.request(app)
          .get(viewAllBankAcctsUrl)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return bank accounts if the email address does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/user/${nonExistentUserEmail}/accounts`)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This email address doesn\'t exist on Banka');
            done();
          });
      });
    });
  });

  describe('Testing view specific details of a given bank account number', () => {
    describe('Testing view specific details of a given bank account number controller for a Logged in User', () => {
      it('should return specific bank account details if the client is authenticated and the bank account number exists', (done) => {
        chai.request(app)
          .get(testVariablesObj.viewSingleBankAcctUrl)
          .set('authorization', `Bearer ${clientSignInToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('createdOn');
            expect(res.body.data).to.have.property('accountNumber');
            expect(res.body.data).to.have.property('ownerEmail');
            expect(res.body.data).to.have.property('type');
            expect(res.body.data).to.have.property('status');
            expect(res.body.data).to.have.property('balance');
            done();
          });
      });

      it('should not return bank account if the user token is invalid', (done) => {
        chai.request(app)
          .get(testVariablesObj.viewSingleBankAcctUrl)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return bank account if the account number does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/accounts/${nonExistentAcctNo}`)
          .set('authorization', `Bearer ${clientSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This account number doesn\'t exist on Banka');
            done();
          });
      });
    });

    describe('Testing view specific details of a given bank account number controller for a Logged in Staff', () => {
      it('should return specific bank account details if the cashier is authenticated and the bank account number exists', (done) => {
        chai.request(app)
          .get(testVariablesObj.viewSingleBankAcctUrl)
          .set('authorization', `Bearer ${staffSignInToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('createdOn');
            expect(res.body.data).to.have.property('accountNumber');
            expect(res.body.data).to.have.property('ownerEmail');
            expect(res.body.data).to.have.property('type');
            expect(res.body.data).to.have.property('status');
            expect(res.body.data).to.have.property('balance');
            done();
          });
      });

      it('should not return bank account if the cashier token is invalid', (done) => {
        chai.request(app)
          .get(testVariablesObj.viewSingleBankAcctUrl)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return bank account if the account number does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/accounts/${nonExistentAcctNo}`)
          .set('authorization', `Bearer ${staffSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This account number doesn\'t exist on Banka');
            done();
          });
      });
    });

    describe('Testing view specific details of a given bank account number controller for a Logged in Admin', () => {
      it('should return specific bank account details if the admin is authenticated and the bnak account number exists', (done) => {
        chai.request(app)
          .get(testVariablesObj.viewSingleBankAcctUrl)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('createdOn');
            expect(res.body.data).to.have.property('accountNumber');
            expect(res.body.data).to.have.property('ownerEmail');
            expect(res.body.data).to.have.property('type');
            expect(res.body.data).to.have.property('status');
            expect(res.body.data).to.have.property('balance');
            done();
          });
      });

      it('should not return bank account if the user token is invalid', (done) => {
        chai.request(app)
          .get(testVariablesObj.viewSingleBankAcctUrl)
          .set('authorization', 'Bearer obviouslyWrongToken')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });

      it('should not return bank account if the account number does not exist', (done) => {
        chai.request(app)
          .get(`/api/v1/accounts/${nonExistentAcctNo}`)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('This account number doesn\'t exist on Banka');
            done();
          });
      });
    });
  });
});

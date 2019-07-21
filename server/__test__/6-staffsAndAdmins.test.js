/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import queries from '../PostgreSQL/dbTablesCrudQueries';

import app from '../app';
import { testVariablesObj } from '../config/config';

chai.use(chaiHttp);

describe('Testing Staff and Admin Controller for endpoints that only both are privileged to use', () => {
  let adminSignInToken;
  let staffSignInToken;
  const adminSignInUrl = '/api/v1/auth/admin/signin';
  const staffSignInUrl = '/api/v1/auth/staff/signin';
  before((done) => {
    testVariablesObj.deleteBankAcctUrl = `/api/v1/accounts/${testVariablesObj.testAccountNumber}`;
    testVariablesObj.toggleBankAcctStatusUrl = `/api/v1/accounts/${testVariablesObj.testAccountNumber}`;
    queries.getRowsOfColumns('account', ['accountNumber'], 'accountId', '1', ['secondTestAcctNo'])
      .then(([{ secondTestAcctNo }]) => {
        testVariablesObj.secondDeleteBankAcctUrl = `/api/v1/accounts/${secondTestAcctNo}`;
        done();
      });
  });

  describe('Testing activate or deactivate bank account controller', () => {
    describe('Testing activate or deactivate bank account controller for Logged-in Admin', () => {
      it('should change status of bank account in request parameter from active to dormant', (done) => {
        chai.request(app)
          .post(adminSignInUrl)
          .send({
            email: 'yusikelebe@gmail.com',
            password: 'ajulo42oluwawa',
            typeOfUser: 'admin',
          })
          .end((err, res) => {
            adminSignInToken = res.body.data.token;
            chai.request(app)
              .patch(testVariablesObj.toggleBankAcctStatusUrl)
              .set('authorization', `Bearer ${adminSignInToken}`)
              .end((error, response) => {
                expect(response.body).to.be.an('object');
                expect(response).to.have.status(201);
                expect(response.body.status).to.equal(201);
                expect(response.body.data).to.be.a('object');
                expect(response.body.data).to.have.property('accountNumber');
                expect(response.body.data).to.have.property('status');
                expect(response.body.data).to.have.property('message');
                expect(response.body.data.status).to.equal('dormant');
                expect(response.body.data.message).to.equal('This bank account status has been changed to dormant');
                done();
              });
          });
      });
    });

    describe('Testing activate or deactivate bank account controller for Logged-in Staff', () => {
      it('should change status of bank account in request parameter from dormant to active', (done) => {
        chai.request(app)
          .post(staffSignInUrl)
          .send({
            email: 'alliafunkun@gmail.com',
            password: 'ajulo42oluwawa',
            typeOfUser: 'cashier',
          })
          .end((err, res) => {
            staffSignInToken = res.body.data.token;
            chai.request(app)
              .patch(testVariablesObj.toggleBankAcctStatusUrl)
              .set('authorization', `Bearer ${staffSignInToken}`)
              .end((error, response) => {
                expect(response.body).to.be.an('object');
                expect(response).to.have.status(201);
                expect(response.body.status).to.equal(201);
                expect(response.body.data).to.be.a('object');
                expect(response.body.data).to.have.property('accountNumber');
                expect(response.body.data).to.have.property('status');
                expect(response.body.data).to.have.property('message');
                expect(response.body.data.status).to.equal('active');
                expect(response.body.data.message).to.equal('This bank account status has been changed to active');
                done();
              });
          });
      });
    });

    describe('Testing activate or deactivate bank account controller for a non admin nor staff sign-in', () => {
      let clientToken;
      const clientSignInUrl = '/api/v1/auth/signin';
      it('should not change bank account status', (done) => {
        chai.request(app)
          .post(clientSignInUrl)
          .send({
            email: 'test@test.com',
            password: 'ajulo2oluwawa',
            typeOfUser: 'client',
          })
          .end((err, res) => {
            clientToken = res.body.data.token;
            chai.request(app)
              .patch(testVariablesObj.toggleBankAcctStatusUrl)
              .set('authorization', `Bearer ${clientToken}`)
              .end((error, response) => {
                expect(response.body).to.be.an('object');
                expect(response).to.have.status(403);
                expect(response.body.status).to.equal(403);
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.equal('Not Authorized');
                done();
              });
          });
      });

      it('should return internal server error for a request without token as a way to test '
        + '"async" library promise rejection that is used to run middlewares', (done) => {
        chai.request(app)
          .patch(testVariablesObj.toggleBankAcctStatusUrl)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(500);
            expect(response.body.status).to.equal(500);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal("TypeError: Cannot read property 'split' of undefined");
            done();
          });
      });
    });

    describe('Testing activate or deactivate bank account controller for wrong or empty account number', () => {
      it('should not change status of bank account number that is non existent', (done) => {
        const nonExistentAcct = '759845239';
        chai.request(app)
          .patch(`/api/v1/accounts/${nonExistentAcct}`)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(404);
            expect(response.body.status).to.equal(404);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('This account number doesn\'t exist on Banka');
            done();
          });
      });
    });
  });

  describe('Testing view all bank accounts controller', () => {
    const viewAllAccountsUrl = '/api/v1/accounts';
    describe('Testing view all bank accounts controller for Logged-in Admin', () => {
      it('should return all bank accounts if admin is authenticated', (done) => {
        chai.request(app)
          .get(viewAllAccountsUrl)
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
            expect(res.body.data[0]).to.have.property('ownerEmail');
            expect(res.body.data[0]).to.have.property('type');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('balance');
            expect(res.body.data[1]).to.be.an('object');
            expect(res.body.data[1]).to.have.property('createdOn');
            expect(res.body.data[1]).to.have.property('accountNumber');
            expect(res.body.data[1]).to.have.property('ownerEmail');
            expect(res.body.data[1]).to.have.property('type');
            expect(res.body.data[1]).to.have.property('status');
            expect(res.body.data[1]).to.have.property('balance');
            expect(res.body.data[2]).to.be.an('object');
            expect(res.body.data[2]).to.have.property('createdOn');
            expect(res.body.data[2]).to.have.property('accountNumber');
            expect(res.body.data[2]).to.have.property('ownerEmail');
            expect(res.body.data[2]).to.have.property('type');
            expect(res.body.data[2]).to.have.property('status');
            expect(res.body.data[2]).to.have.property('balance');
            done();
          });
      });
    });

    describe('Testing view all bank accounts controller for Logged-in Staff', () => {
      it('should return all bank accounts if cashier is authenticated', (done) => {
        chai.request(app)
          .get(viewAllAccountsUrl)
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
            expect(res.body.data[0]).to.have.property('ownerEmail');
            expect(res.body.data[0]).to.have.property('type');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('balance');
            expect(res.body.data[1]).to.be.an('object');
            expect(res.body.data[1]).to.have.property('createdOn');
            expect(res.body.data[1]).to.have.property('accountNumber');
            expect(res.body.data[1]).to.have.property('ownerEmail');
            expect(res.body.data[1]).to.have.property('type');
            expect(res.body.data[1]).to.have.property('status');
            expect(res.body.data[1]).to.have.property('balance');
            expect(res.body.data[2]).to.be.an('object');
            expect(res.body.data[2]).to.have.property('createdOn');
            expect(res.body.data[2]).to.have.property('accountNumber');
            expect(res.body.data[2]).to.have.property('ownerEmail');
            expect(res.body.data[2]).to.have.property('type');
            expect(res.body.data[2]).to.have.property('status');
            expect(res.body.data[2]).to.have.property('balance');
            done();
          });
      });
    });

    describe('Testing view all bank accounts controller for a non admin nor staff sign-in', () => {
      let clientToken;
      const clientSignInUrl = '/api/v1/auth/signin';
      it('should not return bank accounts', (done) => {
        chai.request(app)
          .post(clientSignInUrl)
          .send({
            email: 'test@test.com',
            password: 'ajulo2oluwawa',
            typeOfUser: 'client',
          })
          .end((err, res) => {
            clientToken = res.body.data.token;
            chai.request(app)
              .get(viewAllAccountsUrl)
              .set('authorization', `Bearer ${clientToken}`)
              .end((error, response) => {
                expect(response.body).to.be.an('object');
                expect(response).to.have.status(403);
                expect(response.body.status).to.equal(403);
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.equal('Not Authorized');
                done();
              });
          });
      });
    });
  });

  describe('Testing view all active bank accounts controller', () => {
    const viewAllActiveAccountsUrl = '/api/v1/accounts?status=active';
    describe('Testing view all active bank accounts controller for Logged-in Admin', () => {
      it('should return all active bank accounts if admin is authenticated', (done) => {
        chai.request(app)
          .get(viewAllActiveAccountsUrl)
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
            expect(res.body.data[0]).to.have.property('ownerEmail');
            expect(res.body.data[0]).to.have.property('type');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('balance');
            expect(res.body.data[1]).to.be.an('object');
            expect(res.body.data[1]).to.have.property('createdOn');
            expect(res.body.data[1]).to.have.property('accountNumber');
            expect(res.body.data[1]).to.have.property('ownerEmail');
            expect(res.body.data[1]).to.have.property('type');
            expect(res.body.data[1]).to.have.property('status');
            expect(res.body.data[1]).to.have.property('balance');
            done();
          });
      });
    });

    describe('Testing view all active bank accounts controller for Logged-in Staff', () => {
      it('should return all bank active accounts if cashier is authenticated', (done) => {
        chai.request(app)
          .get(viewAllActiveAccountsUrl)
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
            expect(res.body.data[0]).to.have.property('ownerEmail');
            expect(res.body.data[0]).to.have.property('type');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('balance');
            done();
          });
      });
    });

    describe('Testing view all active bank accounts controller for a non admin nor staff sign-in', () => {
      let clientToken;
      const clientSignInUrl = '/api/v1/auth/signin';
      it('should not return bank accounts', (done) => {
        chai.request(app)
          .post(clientSignInUrl)
          .send({
            email: 'test@test.com',
            password: 'ajulo2oluwawa',
            typeOfUser: 'client',
          })
          .end((err, res) => {
            clientToken = res.body.data.token;
            chai.request(app)
              .get(viewAllActiveAccountsUrl)
              .set('authorization', `Bearer ${clientToken}`)
              .end((error, response) => {
                expect(response.body).to.be.an('object');
                expect(response).to.have.status(403);
                expect(response.body.status).to.equal(403);
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.equal('Not Authorized');
                done();
              });
          });
      });
    });
  });

  describe('Testing view all dormant bank accounts controller', () => {
    const viewAllDormantAccountsUrl = '/api/v1/accounts?status=dormant';
    before((done) => {
      chai.request(app)
        .patch(testVariablesObj.toggleBankAcctStatusUrl)
        .set('authorization', `Bearer ${adminSignInToken}`)
        .end((error, response) => {
          done();
        });
    });
    describe('Testing view all dormant bank accounts controller for Logged-in Admin', () => {
      it('should return all dormant bank accounts if admin is authenticated', (done) => {
        chai.request(app)
          .get(viewAllDormantAccountsUrl)
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
            expect(res.body.data[0]).to.have.property('ownerEmail');
            expect(res.body.data[0]).to.have.property('type');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0].status).to.equal('dormant');
            expect(res.body.data[0]).to.have.property('balance');
            done();
          });
      });
    });

    describe('Testing view all dormant bank accounts controller for Logged-in Staff', () => {
      it('should return all bank dormant accounts if cashier is authenticated', (done) => {
        chai.request(app)
          .get(viewAllDormantAccountsUrl)
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
            expect(res.body.data[0]).to.have.property('ownerEmail');
            expect(res.body.data[0]).to.have.property('type');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0].status).to.equal('dormant');
            expect(res.body.data[0]).to.have.property('balance');
            done();
          });
      });
    });

    describe('Testing view all dormant bank accounts controller for a non admin nor staff sign-in', () => {
      let clientToken;
      const clientSignInUrl = '/api/v1/auth/signin';
      it('should not return bank accounts', (done) => {
        chai.request(app)
          .post(clientSignInUrl)
          .send({
            email: 'test@test.com',
            password: 'ajulo2oluwawa',
            typeOfUser: 'client',
          })
          .end((err, res) => {
            clientToken = res.body.data.token;
            chai.request(app)
              .get(viewAllDormantAccountsUrl)
              .set('authorization', `Bearer ${clientToken}`)
              .end((error, response) => {
                expect(response.body).to.be.an('object');
                expect(response).to.have.status(403);
                expect(response.body.status).to.equal(403);
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.equal('Not Authorized');
                done();
              });
          });
      });
    });
  });

  describe('Testing delete bank account controller', () => {
    describe('Testing delete bank account controller for Logged-in Admin', () => {
      it('should delete bank account in request parameter from database', (done) => {
        chai.request(app)
          .delete(testVariablesObj.deleteBankAcctUrl)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body).to.have.property('status');
            expect(response.body).to.have.property('message');
            expect(response.body.status).to.equal(201);
            expect(response.body.message).to.equal('Account successfully deleted');
            done();
          });
      });
    });

    describe('Testing delete bank account controller for Logged-in Staff', () => {
      it('should delete bank account in request parameter from database', (done) => {
        chai.request(app)
          .delete(testVariablesObj.secondDeleteBankAcctUrl)
          .set('authorization', `Bearer ${staffSignInToken}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body).to.have.property('status');
            expect(response.body).to.have.property('message');
            expect(response.body.status).to.equal(201);
            expect(response.body.message).to.equal('Account successfully deleted');
            done();
          });
      });
    });

    describe('Testing delete bank account controller for a non admin nor staff sign-in', () => {
      let clientToken;
      const clientSignInUrl = '/api/v1/auth/signin';
      it('should not delete bank account', (done) => {
        chai.request(app)
          .post(clientSignInUrl)
          .send({
            email: 'test@test.com',
            password: 'ajulo2oluwawa',
            typeOfUser: 'client',
          })
          .end((err, res) => {
            clientToken = res.body.data.token;
            chai.request(app)
              .delete(testVariablesObj.deleteBankAcctUrl)
              .set('authorization', `Bearer ${clientToken}`)
              .end((error, response) => {
                expect(response.body).to.be.an('object');
                expect(response).to.have.status(403);
                expect(response.body.status).to.equal(403);
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.equal('Not Authorized');
                done();
              });
          });
      });
    });

    describe('Testing delete bank account controller for wrong or non-existent account number', () => {
      it('could not delete bank account whose account number is non existent', (done) => {
        const nonExistentAcct = '759845239';
        chai.request(app)
          .delete(`/api/v1/accounts/${nonExistentAcct}`)
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(404);
            expect(response.body.status).to.equal(404);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('This account number doesn\'t exist on Banka');
            done();
          });
      });
    });
  });
});

/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import queries from '../PostgreSQL/dbTablesCrudQueries';

import app from '../app';
import { testVariablesObj } from '../config/config';

chai.use(chaiHttp);

describe('Testing Staff and Admin Controller for endpoints that only both are privileged to use', () => {
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
    let adminSignInToken;
    describe('Testing activate or deactivate bank account controller for Logged-in Admin', () => {
      const adminSignInUrl = '/api/v1/auth/admin/signin';
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
      let staffSignInToken;
      const staffSignInUrl = '/api/v1/auth/staff/signin';
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

  describe('Testing delete bank account controller', () => {
    let adminSignInToken;
    describe('Testing delete bank account controller for Logged-in Admin', () => {
      const adminSignInUrl = '/api/v1/auth/admin/signin';
      it('should delete bank account in request parameter from database', (done) => {
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
    });

    describe('Testing delete bank account controller for Logged-in Staff', () => {
      let staffSignInToken;
      const staffSignInUrl = '/api/v1/auth/staff/signin';
      it('should delete bank account in request parameter from database', (done) => {
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

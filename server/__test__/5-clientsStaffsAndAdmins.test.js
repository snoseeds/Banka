/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing User, Staff, and Admin Controller for endpoints that the trio are privileged to use', () => {
  let clientSignInToken;
  let staffSignInToken;
  let adminSignInToken;
  const clientSignInUrl = '/api/v1/auth/signin';
  const staffSignInUrl = '/api/v1/auth/staff/signin';
  const adminSignInUrl = '/api/v1/auth/admin/signin';
  const accountNumber = '324295312';
  const nonExistentAcctNo = '343922111';

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
              .get(`/api/v1/accounts/${accountNumber}/transactions`)
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
          .get(`/api/v1/accounts/${accountNumber}/transactions`)
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
              .get(`/api/v1/accounts/${accountNumber}/transactions`)
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
          .get(`/api/v1/accounts/${accountNumber}/transactions`)
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
      it('should return the bank account transactions if the client is authenticated and if account number exists', (done) => {
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
              .get(`/api/v1/accounts/${accountNumber}/transactions`)
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
          .get(`/api/v1/accounts/${accountNumber}/transactions`)
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
});

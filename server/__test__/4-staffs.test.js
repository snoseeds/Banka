/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing Staff (cashier) Controller', () => {
  let staffSignInToken;
  describe('Testing staff signin controller', () => {
    const signinUrl = '/api/v1/auth/staff/signin';
    it(
      'should login a staff member that has been registered by admin when all the parameters are given',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'alliafunkun@gmail.com',
            password: 'ajulo42oluwawa',
            typeOfUser: 'cashier',
          })

          .end((error, response) => {
            staffSignInToken = response.body.data.token;
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body.status).to.equal(201);
            expect(response.body.data).to.be.a('object');
            expect(response.body.data).to.have.property('token');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('firstName');
            expect(response.body.data).to.have.property('lastName');
            expect(response.body.data).to.have.property('email');
            expect(response.body.data).to.have.property('message');
            expect(response.body.data.token).to.be.a('string');
            expect(response.body.data.email).to.equal('alliafunkun@gmail.com');
            expect(response.body.data.message).to.equal('Login is successful');
            done();
          });
      },
    );

    it(
      'should not login a staff member when the Email field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            password: 'christWasNeverGod',
          })

          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(400);
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Email is required');
            done();
          });
      },
    );

    it(
      'should not login a staff member when the Password field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'alliafunkun@gmail.com',
          })

          .end((error, response) => {
            // console.log('error', response);
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(400);
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Password is required');
            done();
          });
      },
    );

    it(
      'should not login a staff member when the "Type of User" field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'alliafunkun@gmail.com',
            password: 'ajulo42oluwawa',
          })

          .end((error, response) => {
            // console.log('error', response);
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(400);
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Type of user is required');
            done();
          });
      },
    );

    it('should not login a registered / signed-up admin / any other user when type of user is not "cashier"', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'yusikelebe@gmail.com',
          password: 'ajulo42oluwawa',
          typeOfUser: 'admin',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(403);
          expect(response.body.status).to.equal(403);
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.equal('Not Authorized');
          done();
        });
    });

    it(
      'should not login a staff member whose email does not exist in the database',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'undefined@gmail.com',
            password: 'nullpassword',
            typeOfUser: 'cashier',
          })

          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(403);
            expect(response.body.status).to.equal(403);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('User with this email doesn\'t exist');
            done();
          });
      },
    );

    it(
      'should not login a a staff member whose email exists but supplies a wrong password',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'alliafunkun@gmail.com',
            password: 'wrongPassword',
            typeOfUser: 'cashier',
          })

          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(400);
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('The supplied password is wrong');
            done();
          });
      },
    );
  });

  // describe('Testing staff credit account controller', () => {
  //   const creditAcctUrl = '/api/v1/transactions/518791354/credit';
  //   it('should successfully credit account when all the criteria and parameters are rightly met and given', (done) => {
  //     chai.request(app)
  //       .post(creditAcctUrl)
  //       .set('authorization', `Bearer ${staffSignInToken}`)
  //       .send({
  //         amount: 45000.89,
  //       })
  //       .end((err, res) => {
  //         expect(res.body).to.be.an('object');
  //         expect(res).to.have.status(201);
  //         expect(res.body.status).to.equal(201);
  //         expect(res.body.data).to.be.an('object');
  //         expect(res.body.data.transactionId).to.be.a('number');
  //         expect(res.body.data.accountNumber).to.be.a('string');
  //         expect(res.body.data.amount).to.be.a('number');
  //         expect(res.body.data.cashier).to.be.a('number');
  //         expect(res.body.data.transactionType).to.be.a('string');
  //         expect(res.body.data.accountBalance).to.be.a('string');
  //         done();
  //       });
  //   });
  //   it('should not credit account if amount field is empty', (done) => {
  //     chai.request(app)
  //       .post(creditAcctUrl)
  //       .set('authorization', `Bearer ${staffSignInToken}`)
  //       .send({

  //       })
  //       .end((err, res) => {
  //         expect(res.body).to.be.an('object');
  //         expect(res).to.have.status(400);
  //         expect(res.body.status).to.equal(400);
  //         expect(res.body.error).to.be.a('string');
  //         expect(res.body.error).to.equal('Credit amount is required');
  //         done();
  //       });
  //   });
  //   it('should not credit account if amount is less than or equal to zero', (done) => {
  //     chai.request(app)
  //       .post(creditAcctUrl)
  //       .set('authorization', `Bearer ${staffSignInToken}`)
  //       .send({
  //         amount: -5000.45,
  //       })
  //       .end((err, res) => {
  //         expect(res.body).to.be.an('object');
  //         expect(res).to.have.status(400);
  //         expect(res.body.status).to.equal(400);
  //         expect(res.body.error).to.be.a('string');
  //         expect(res.body.error).to.equal('Amount to be credited must be a non-zero positive number');
  //         done();
  //       });
  //   });

  //   describe('Testing credit bank account controller for a non staff sign-in', () => {
  //     let clientToken;
  //     const clientSignInUrl = '/api/v1/auth/signin';
  //     it('should not credit bank account', (done) => {
  //       chai.request(app)
  //         .post(clientSignInUrl)
  //         .send({
  //           email: 'johndoe@gmail.com',
  //           password: 'olujuwondoke',
  //           typeOfUser: 'client',
  //         })
  //         .end((err, res) => {
  //           clientToken = res.body.data.token;
  //           chai.request(app)
  //             .post(creditAcctUrl)
  //             .set('authorization', `Bearer ${clientToken}`)
  //             .end((error, response) => {
  //               expect(response.body).to.be.an('object');
  //               expect(response).to.have.status(403);
  //               expect(response.body.status).to.equal(403);
  //               expect(response.body).to.have.property('error');
  //               expect(response.body.error).to.equal('Not Authorized');
  //               done();
  //             });
  //         });
  //     });
  //   });

  //   describe('Testing credit bank account controller for wrong or non-existent account number', () => {
  //     it('could not credit bank account whose account number is non existent', (done) => {
  //       const nonExistentAcct = '759845239';
  //       chai.request(app)
  //         .post(`/api/v1/transactions/${nonExistentAcct}/credit`)
  //         .set('authorization', `Bearer ${staffSignInToken}`)
  //         .end((error, response) => {
  //           expect(response.body).to.be.an('object');
  //           expect(response).to.have.status(404);
  //           expect(response.body.status).to.equal(404);
  //           expect(response.body.error).to.be.a('string');
  //           expect(response.body.error).to.equal('This account number doesn\'t exist on Banka');
  //           done();
  //         });
  //     });
  //   });
  // });

  // describe('Testing staff debit account controller', () => {
  //   const debitAcctUrl = '/api/v1/transactions/518791354/debit';
  //   it('should successfully debit account when all the criteria and parameters are rightly met and given', (done) => {
  //     chai.request(app)
  //       .post(debitAcctUrl)
  //       .set('authorization', `Bearer ${staffSignInToken}`)
  //       .send({
  //         amount: 45000.89,
  //       })
  //       .end((err, res) => {
  //         expect(res.body).to.be.an('object');
  //         expect(res).to.have.status(201);
  //         expect(res.body.status).to.equal(201);
  //         expect(res.body.data).to.be.an('object');
  //         expect(res.body.data.transactionId).to.be.a('number');
  //         expect(res.body.data.accountNumber).to.be.a('string');
  //         expect(res.body.data.amount).to.be.a('number');
  //         expect(res.body.data.cashier).to.be.a('number');
  //         expect(res.body.data.transactionType).to.be.a('string');
  //         expect(res.body.data.accountBalance).to.be.a('string');
  //         done();
  //       });
  //   });
  //   it('should not debit account if amount field is empty', (done) => {
  //     chai.request(app)
  //       .post(debitAcctUrl)
  //       .set('authorization', `Bearer ${staffSignInToken}`)
  //       .send({

  //       })
  //       .end((err, res) => {
  //         expect(res.body).to.be.an('object');
  //         expect(res).to.have.status(400);
  //         expect(res.body.status).to.equal(400);
  //         expect(res.body.error).to.be.a('string');
  //         expect(res.body.error).to.equal('Debit amount is required');
  //         done();
  //       });
  //   });
  //   it('should not debit account if amount is less than or equal to zero', (done) => {
  //     chai.request(app)
  //       .post(debitAcctUrl)
  //       .set('authorization', `Bearer ${staffSignInToken}`)
  //       .send({
  //         amount: -5000.45,
  //       })
  //       .end((err, res) => {
  //         expect(res.body).to.be.an('object');
  //         expect(res).to.have.status(400);
  //         expect(res.body.status).to.equal(400);
  //         expect(res.body.error).to.be.a('string');
  //         expect(res.body.error).to.equal('Amount to be debited must be a non-zero positive number');
  //         done();
  //       });
  //   });

  //   describe('Testing debit bank account controller for a non staff sign-in', () => {
  //     let clientToken;
  //     const clientSignInUrl = '/api/v1/auth/signin';
  //     it('should not debit bank account', (done) => {
  //       chai.request(app)
  //         .post(clientSignInUrl)
  //         .send({
  //           email: 'johndoe@gmail.com',
  //           password: 'olujuwondoke',
  //           typeOfUser: 'client',
  //         })
  //         .end((err, res) => {
  //           clientToken = res.body.data.token;
  //           chai.request(app)
  //             .post(debitAcctUrl)
  //             .set('authorization', `Bearer ${clientToken}`)
  //             .end((error, response) => {
  //               expect(response.body).to.be.an('object');
  //               expect(response).to.have.status(403);
  //               expect(response.body.status).to.equal(403);
  //               expect(response.body).to.have.property('error');
  //               expect(response.body.error).to.equal('Not Authorized');
  //               done();
  //             });
  //         });
  //     });
  //   });

  //   describe('Testing debit bank account controller for wrong or non-existent account number', () => {
  //     it('could not debit bank account whose account number is non existent', (done) => {
  //       const nonExistentAcct = '759845239';
  //       chai.request(app)
  //         .post(`/api/v1/transactions/${nonExistentAcct}/debit`)
  //         .set('authorization', `Bearer ${staffSignInToken}`)
  //         .end((error, response) => {
  //           expect(response.body).to.be.an('object');
  //           expect(response).to.have.status(404);
  //           expect(response.body.status).to.equal(404);
  //           expect(response.body.error).to.be.a('string');
  //           expect(response.body.error).to.equal('This account number doesn\'t exist on Banka');
  //           done();
  //         });
  //     });
  //   });
  // });
});

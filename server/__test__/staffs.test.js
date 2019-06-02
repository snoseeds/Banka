/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';
// import migrations from '../models/migration';

chai.use(chaiHttp);

describe('Testing Staff (cashier) Controller', () => {
  // before(() => {
  //   migrations.createTables();
  // });

  let adminSignInToken;
  describe('Testing staff signin controller', () => {
    const signinUrl = '/api/v1/auth/staff/signin';
    it(
      'should login a staff member that has been registered by admin when all the parameters are given',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'kutjosh@gmail.com',
            password: 'christWasNeverGod',
            typeOfUser: 'cashier',
          })

          .end((error, response) => {
            adminSignInToken = response.body.data.token;
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
            expect(response.body.data.email).to.equal('kutjosh@gmail.com');
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
            // console.log('error', response);
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
            email: 'kutjosh@gmail.com',
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
            email: 'kutjosh@gmail.com',
            password: 'christWasNeverGod',
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
          email: 'sky@gmail.com',
          password: 'kenny4roger',
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
            // console.log('error', response);
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
            email: 'kutjosh@gmail.com',
            password: 'addChristStatus',
            typeOfUser: 'cashier',
          })

          .end((error, response) => {
            // console.log('error', response);
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
});
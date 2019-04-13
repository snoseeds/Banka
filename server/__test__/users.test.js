/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';
import migrations from '../models/migration';

chai.use(chaiHttp);

describe('Testing User Controller', () => {
  before(() => {
    migrations.createTables();
  });
  describe('Testing signup controller', () => {
    const signupUrl = '/api/v1/auth/signup';
    it(
      'should register a new user when all the parameters are given',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'shakirat',
            lastName: 'oke',
            email: 'test@test.com',
            password: 'olujuwondoke',
            confirmPassword: 'olujuwondoke',
            typeOfUser: 'client',
          })

          .end((error, response) => {
            // console.log('error', response);
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body.status).to.equal(201);
            expect(response.body.data).to.be.a('object');
            expect(response.body.data).to.have.property('token');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('firstName');
            expect(response.body.data).to.have.property('lastName');
            expect(response.body.data).to.have.property('email');
            expect(response.body.data.token).to.be.a('string');
            expect(response.body.data.email).to.equal('test@test.com');
            expect(response.body.data.message).to.equal('Account created successfully');
            done();
          });
      },
    );

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Shakirat',
          lastName: 'Oke',
          password: 'olujuwondoke',
          confirmPassword: 'olujuwondoke',
          typeOfUser: 'client',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          lastName: 'Oke',
          password: 'password',
          confirmPassword: 'password',
          typeOfUser: 'client',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('First name is required');
          done();
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Oke',
          password: 'olujuwondoke',
          confirmPassword: 'olujuwondoke',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Last name is required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'test@test.com',
          firstName: 'Shakirat',
          lastName: 'olujuwondoke',
          confirmPassword: 'olujuwondoke',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Password is required');
          done();
        });
    });

    it('should not register a user when type of user is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Shakirat',
          lastName: 'olujuwondoke',
          email: 'test@test.com',
          password: 'olujuwondoke'
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Type of user is required');
          done();
        });
    });

    it('should not register a user when the passwords do not match', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'test@test.com',
          firstName: 'Shakirat',
          lastName: 'oke',
          password: 'password',
          confirmPassword: 'Passwords that do not match',
          typeOfUser: 'client',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Passwords do not match');
          done();
        });
    });

    it('should not register a user when the email already exist', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Shakirat',
          lastName: 'Oke',
          email: 'johndoe@gmail.com',
          password: 'password',
          confirmPassword: 'password',
          typeOfUser: 'client',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('A user with the given email already exists');
          done();
        });
    });
  });

  describe('Testing signin controller', () => {
    const signinUrl = '/api/v1/auth/signin';
    it(
      'should login a registered user when all the parameters are given',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'test@test.com',
            password: 'olujuwondoke',
          })

          .end((error, response) => {
            // console.log('error', response);
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body.status).to.equal(201);
            expect(response.body.data).to.be.a('object');
            expect(response.body.data).to.have.property('token');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('firstName');
            expect(response.body.data).to.have.property('lastName');
            expect(response.body.data).to.have.property('email');
            expect(response.body.data.token).to.be.a('string');
            expect(response.body.data.email).to.equal('test@test.com');
            expect(response.body.data.message).to.equal('Successful Login');
            done();
          });
      },
    );

    it(
      'should not login a registered user when the Email field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            password: 'olujuwondoke',
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
      'should not login a registered user when the Password field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'test@test.com',
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
  });
});

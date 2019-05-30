/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';
// import migrations from '../models/migration';

chai.use(chaiHttp);

describe('Testing Root Admin Controller', () => {
  // before(() => {
  //   migrations.createTables();
  // });
  describe('Testing signup controller', () => {
    const signupUrl = '/api/v1/auth/root-admin/signup';
    it(
      'provided number of existing Root Admins is less than three, '
      + 'should register a new Root Admin when all the required parameters are given',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Khadijah',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'rootAdmin',
            mobileNo: '+2348056476410',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A25845236',
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
            expect(response.body.data).to.have.property('mobileNo');
            expect(response.body.data.token).to.be.a('string');
            expect(response.body.data.email).to.equal('igbagbojuwon@gmail.com');
            expect(response.body.data.mobileNo).to.equal('+2348056476410');
            expect(response.body.data.message).to.equal('Account created successfully');
            done();
          });
      },
    );

    it(
      'provided number of existing Root Admins is already equal to three, should not register '
      + 'a new Root Admin even if all the required parameters are given',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbodunni@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'rootAdmin',
            mobileNo: '+2348056677292',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A25896322',
          })
          .end(() => {
            chai.request(app)
              .post(signupUrl)
              .send({
                firstName: 'Yusirat',
                lastName: 'Soremekun',
                email: 'yusikelebe@gmail.com',
                password: 'ajulo42oluwawa',
                confirmPassword: 'ajulo42oluwawa',
                typeOfUser: 'rootAdmin',
                mobileNo: '+2347037876116',
                houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
                idCardType: 3,
                idCardNumber: 'A25123698',
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
      },
    );

    it(
      'should not register a Root-admin when the email is missing',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            password: 'ajulo2oluwawa',
            confirmPassword: 'ajulo2oluwawa',
            typeOfUser: 'rootAdmin',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Email is required');
            done();
          });
      },
    );

    it(
      'should not register a Root-admin when the first name is missing',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo2oluwawa',
            confirmPassword: 'ajulo2oluwawa',
            typeOfUser: 'rootAdmin', 
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('First name is required');
            done();
          });
      },
    );


    it(
      'should not register a user when the last name is missing',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Last name is required');
            done();
          });
      },
    );

    it(
      'should not register a user when the password is missing',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            confirmPassword: 'ajulo42oluwawa',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Password is required');
            done();
          });
      },
    );

    it(
      'should not register a user when type of user is missing',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Type of user is required');
            done();
          });
      },
    );

    it(
      'should not register a user when Mobile No is missing',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'rootAdmin',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A25845236',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Mobile Number is required');
            done();
          });
      },
    );

    it(
      'should not register a user when House Address is missing',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'rootAdmin',
            mobileNo: '+2348056476410',
            idCardType: 3,
            idCardNumber: 'A25845236',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('House Address is required');
            done();
          });
      },
    );

    it(
      'should not register a user when ID Card Type is missing',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'rootAdmin',
            mobileNo: '+2348056476410',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardNumber: 'A25845236',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('ID Card Type is required');
            done();
          });
      },
    );

    it(
      'should not register a user when ID Card Number is missing',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'rootAdmin',
            mobileNo: '+2348056476410',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('ID Card Number is required');
            done();
          });
      },
    );

    it(
      'should not register a user when type of user is not "rootAdmin"',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'admin',
            mobileNo: '+2348056476410',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A25845236',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(403);
            expect(response.body.status).to.equal(403);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Not Authorized');
            done();
          });
      },
    );

    it(
      'should not register a user when the passwords do not match',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo2oluwawa',
            typeOfUser: 'rootAdmin',
            mobileNo: '+2348056476410',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A25845236',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Passwords do not match');
            done();
          });
      },
    );

    it(
      'should not register a user when the email already exists',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Olabisi',
            lastName: 'Abdus-Samee\'',
            email: 'snoworlddocs@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'rootAdmin',
            mobileNo: '+2348056476410',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A25845236',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Email supplied has already been taken by an existing user');
            done();
          });
      },
    );

    it(
      'should not register a user when the Mobile Number already exist',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Olabisi',
            lastName: 'Abdus-Samee\'',
            email: 'compulsory2008@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'rootAdmin',
            mobileNo: '+2348125027766',
            houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
            idCardType: 3,
            idCardNumber: 'A23568974',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Mobile number supplied has already been taken by an existing user');
            done();
          });
      },
    );

    it(
      'should not register a user when the idCard Number already exist',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Olabisi',
            lastName: 'Abdus-Samee\'',
            email: 'compulsory2008@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'rootAdmin',
            mobileNo: '+2348033636868',
            houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
            idCardType: 3,
            idCardNumber: 'A23568974',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('ID Card Number supplied has already been taken by an existing user');
            done();
          });
      },
    );
  });
});

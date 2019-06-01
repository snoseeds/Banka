/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';
// import migrations from '../models/migration';

chai.use(chaiHttp);

describe('Testing Admin Controller', () => {
  // before(() => {
  //   migrations.createTables();
  // });

  let adminSignInToken;
  describe('Testing admin signin controller', () => {
    const signinUrl = '/api/v1/auth/admin/signin';
    it(
      'should login an admin that has been registered (by rootAdmin / admin) when all the parameters are given',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'sky@gmail.com',
            password: 'kenny4roger',
            typeOfUser: 'admin',
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
            expect(response.body.data.email).to.equal('sky@gmail.com');
            expect(response.body.data.message).to.equal('Login is successful');
            done();
          });
      },
    );

    it(
      'should not login an admin when the Email field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            password: 'kenny4roger',
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
      'should not login an admin when the Password field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'sky@gmail.com',
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
      'should not login an admin when the "Type of User" field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'sky@gmail.com',
            password: 'kenny4roger',
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

    it('should not login a registered / signed-up staff / any other user when type of user is not admin', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'adechris@gmail.com',
          password: 'christWasNeverGod',
          typeOfUser: 'cashier',
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
      'should not login an admin whose email does not exist in the database',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'undefined@gmail.com',
            password: 'nullpassword',
            typeOfUser: 'admin',
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
      'should not login a registered admin whose email exists but supplies a wrong password',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'sky@gmail.com',
            password: 'addRoger',
            typeOfUser: 'admin',
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

  describe('Testing create admin account controller for admin that has signed in', () => {
    const createAdminAccountUrl = '/api/v1/auth/admin/create-admin-acct';
    it(
      'should register a new Admin when all the required parameters are given',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'Haleemah',
            lastName: 'Akinbode',
            email: 'halakin@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'admin',
            mobileNo: '+2348132721084',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A58975214',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((error, response) => {
            // console.log('error', response);
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body.status).to.equal(201);
            expect(response.body.data).to.be.a('object');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('firstName');
            expect(response.body.data).to.have.property('lastName');
            expect(response.body.data).to.have.property('email');
            expect(response.body.data).to.have.property('mobileNo');
            expect(response.body.data.email).to.equal('halakin@gmail.com');
            expect(response.body.data.mobileNo).to.equal('+2348132721084');
            expect(response.body.data.message).to.equal('Account created successfully');
            done();
          });
      },
    );

    it(
      'should not register an Admin when the email is missing',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            password: 'ajulo2oluwawa',
            confirmPassword: 'ajulo2oluwawa',
            typeOfUser: 'rootAdmin',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when the first name is missing',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo2oluwawa',
            confirmPassword: 'ajulo2oluwawa',
            typeOfUser: 'rootAdmin',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when the last name is missing',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'Maryam',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when the password is missing',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            confirmPassword: 'ajulo42oluwawa',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when type of user is missing',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when Mobile No is missing',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
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
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when House Address is missing',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
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
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when ID Card Type is missing',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
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
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when ID Card Number is missing',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
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
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when type of user is not "Admin"',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'staff',
            mobileNo: '+2348056476410',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A25845236',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when the passwords do not match',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo2oluwawa',
            typeOfUser: 'admin',
            mobileNo: '+2348056476410',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A25845236',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an Admin when the email already exists',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'kehinde',
            lastName: 'soremekun',
            email: 'sky@gmail.com',
            password: 'kenny4roger',
            confirmPassword: 'kenny4roger',
            typeOfUser: 'admin',
            mobileNo: '+2348103774484',
            houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
            idCardType: 3,
            idCardNumber: 'A23562548',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an admin when the Mobile Number already exist',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'kehinde',
            lastName: 'soremekun',
            email: 'yesufu@gmail.com',
            password: 'kenny4roger',
            confirmPassword: 'kenny4roger',
            typeOfUser: 'admin',
            mobileNo: '+2348103774484',
            houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
            idCardType: 3,
            idCardNumber: 'A23562548',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register an admin when the idCard Number already exist',
      (done) => {
        chai.request(app)
          .post(createAdminAccountUrl)
          .send({
            firstName: 'kehinde',
            lastName: 'soremekun',
            email: 'yesufu@gmail.com',
            password: 'kenny4roger',
            confirmPassword: 'kenny4roger',
            typeOfUser: 'admin',
            mobileNo: '+2348103778884',
            houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
            idCardType: 3,
            idCardNumber: 'A23562548',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
 
  describe('Testing create staff account controller for admin that has signed in', () => {
    const createStaffAccountUrl = '/api/v1/auth/admin/create-staff-acct';
    it(
      'should register a new staff (cashier) when all the required parameters are given',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            firstName: 'Alli',
            lastName: 'Afunku',
            email: 'alliafunkun@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
            typeOfUser: 'cashier',
            mobileNo: '+2349033532950',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A75962413',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
          .end((error, response) => {
            // console.log('error', response);
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body.status).to.equal(201);
            expect(response.body.data).to.be.a('object');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('firstName');
            expect(response.body.data).to.have.property('lastName');
            expect(response.body.data).to.have.property('email');
            expect(response.body.data).to.have.property('mobileNo');
            expect(response.body.data.email).to.equal('alliafunkun@gmail.com');
            expect(response.body.data.mobileNo).to.equal('+2349033532950');
            expect(response.body.data.message).to.equal('Account created successfully');
            done();
          });
      },
    );

    it(
      'should not register an staff when the email is missing',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            password: 'ajulo2oluwawa',
            confirmPassword: 'ajulo2oluwawa',
            typeOfUser: 'rootAdmin',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when the first name is missing',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo2oluwawa',
            confirmPassword: 'ajulo2oluwawa',
            typeOfUser: 'rootAdmin',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when the last name is missing',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            firstName: 'Maryam',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when the password is missing',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            confirmPassword: 'ajulo42oluwawa',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when type of user is missing',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo42oluwawa',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when Mobile No is missing',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
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
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when House Address is missing',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
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
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when ID Card Type is missing',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
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
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when ID Card Number is missing',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
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
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when type of user is not "cashier"',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
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
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when the passwords do not match',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            firstName: 'Maryam',
            lastName: 'Nurudeen',
            email: 'igbagbojuwon@gmail.com',
            password: 'ajulo42oluwawa',
            confirmPassword: 'ajulo2oluwawa',
            typeOfUser: 'cashier',
            mobileNo: '+2348056476410',
            houseAddress: '42, Emir\'s road, Ilorin, Kwara State',
            idCardType: 3,
            idCardNumber: 'A25845236',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when the email already exists',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            firstName: 'Joshua',
            lastName: 'Kuti',
            email: 'kutjosh@gmail.com',
            password: 'kenny4roger',
            confirmPassword: 'kenny4roger',
            typeOfUser: 'cashier',
            mobileNo: '+2348103774484',
            houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
            idCardType: 3,
            idCardNumber: 'A23562548',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when the Mobile Number already exist',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            firstName: 'kehinde',
            lastName: 'soremekun',
            email: 'yesufu@gmail.com',
            password: 'kenny4roger',
            confirmPassword: 'kenny4roger',
            typeOfUser: 'cashier',
            mobileNo: '+2348059006860',
            houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
            idCardType: 3,
            idCardNumber: 'A23562548',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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
      'should not register a staff when the idCard Number already exist',
      (done) => {
        chai.request(app)
          .post(createStaffAccountUrl)
          .send({
            firstName: 'kehinde',
            lastName: 'soremekun',
            email: 'yesufu@gmail.com',
            password: 'kenny4roger',
            confirmPassword: 'kenny4roger',
            typeOfUser: 'cashier',
            mobileNo: '+2348103778884',
            houseAddress: '2, Adisa Olorunisola, Oke-Odo, Abiola Way, Abk, Ogun State',
            idCardType: 3,
            idCardNumber: 'A23244648',
          })
          .set('authorization', `Bearer ${adminSignInToken}`)
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

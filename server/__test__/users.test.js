/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';
// import migrations from '../models/migration';

chai.use(chaiHttp);

describe('Testing User Controller', () => {
  // before(() => {
  //   migrations.createTables();
  // });
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
            password: 'ajulo2oluwawa',
            confirmPassword: 'ajulo2oluwawa',
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
          password: 'olujuwondoke',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Type of user is required');
          done();
        });
    });

    it('should not register a user when type of user is not client', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Shakirat',
          lastName: 'olujuwondoke',
          email: 'test@test.com',
          password: 'olujuwondoke',
          typeOfUser: 'admin',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(403);
          expect(response.body.status).to.equal(403);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('Not Authorized');
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
            email: 'johndoe@gmail.com',
            password: 'olujuwondoke',
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
            expect(response.body.data).to.have.property('message');
            expect(response.body.data.token).to.be.a('string');
            expect(response.body.data.email).to.equal('johndoe@gmail.com');
            expect(response.body.data.message).to.equal('Login is successful');
            done();
          });
      },
    );

    it(
      'should not login a user when the Email field is missing',
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
      'should not login a user when the Password field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'johndoe@gmail.com',
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
      'should not login a user when the "Type of User" field is missing',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'johndoe@gmail.com',
            password: 'olujuwondoke',
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

    it('should not login a signed-up user when type of user is not client', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'sky@gmail.com',
          password: '$2b$10$rgZSWmHmx51L/VYEU10TcOKYVhLdFBI.yVkbxWoNz529r1WbxPoAK',
          typeOfUser: 'staff',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(403);
          expect(response.body.status).to.equal(403);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('Not Authorized');
          done();
        });
    });

    it(
      'should not login a user whose email does not exist in the database',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'undefined@gmail.com',
            password: 'nullpassword',
            typeOfUser: 'client',
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
      'should not login a registered user whose email exists but supplies a wrong password',
      (done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'johndoe@gmail.com',
            password: 'wrongpassword',
            typeOfUser: 'client',
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

  describe('Testing create bank account controller', () => {
    describe('Testing create bank account controller for user that just signed up', () => {
      let clientToken;
      const signupUrl = '/api/v1/auth/signup';
      const createAccountUrl = '/api/v1/accounts';
      it(
        'should create a new bank account for user that signed up when all the required parameters are given',
        (done) => {
          chai.request(app)
            .post(signupUrl)
            .send({
              firstName: 'kehinde',
              lastName: 'soremekun',
              email: 'pass@test.com',
              password: 'oluwa2juwalo',
              confirmPassword: 'oluwa2juwalo',
              typeOfUser: 'client',
            })
            .end((err, res) => {
              clientToken = res.body.data.token;
              chai.request(app)
                .post(createAccountUrl)
                .send({
                  accountType: 'current',
                  idCardType: 3,
                  idCardNumber: 'A09579734',
                })
                .set('authorization', `Bearer ${clientToken}`)
                .end((error, response) => {
                  expect(response.body).to.be.an('object');
                  expect(response).to.have.status(201);
                  expect(response.body.status).to.equal(201);
                  expect(response.body.data).to.be.a('object');
                  expect(response.body.data).to.have.property('accountNumber');
                  expect(response.body.data).to.have.property('firstName');
                  expect(response.body.data).to.have.property('lastName');
                  expect(response.body.data).to.have.property('email');
                  expect(response.body.data).to.have.property('type');
                  expect(response.body.data).to.have.property('openingBalance');
                  expect(response.body.data).to.have.property('idCardType');
                  expect(response.body.data).to.have.property('message');
                  done();
                });
            });
        },
      );

      it(
        'should not create a new bank account for user that signed up when account type is missing',
        (done) => {
          chai.request(app)
            .post(createAccountUrl)
            .send({
              idCardType: 3,
              idCardNumber: 'A09579734',
            })
            .set('authorization', `Bearer ${clientToken}`)
            .end((error, response) => {
              expect(response.body).to.be.an('object');
              expect(response).to.have.status(400);
              expect(response.body.status).to.equal(400);
              expect(response.body.error).to.be.a('string');
              expect(response.body.error).to.equal('Type of account (current or savings) is required');
              done();
            });
        },
      );

      it(
        'should not create a new bank account for user that signed up when identification card type is missing',
        (done) => {
          chai.request(app)
            .post(createAccountUrl)
            .send({
              accountType: 'current',
              idCardNumber: 'A09579734',
            })
            .set('authorization', `Bearer ${clientToken}`)
            .end((error, response) => {
              expect(response.body).to.be.an('object');
              expect(response).to.have.status(400);
              expect(response.body.status).to.equal(400);
              expect(response.body.error).to.be.a('string');
              expect(response.body.error).to.equal('Type of identification card is required');
              done();
            });
        },
      );

      it(
        'should not create a new bank account for user that signed up when identification card number is missing',
        (done) => {
          chai.request(app)
            .post(createAccountUrl)
            .send({
              accountType: 'current',
              idCardType: 3,
            })
            .set('authorization', `Bearer ${clientToken}`)
            .end((error, response) => {
              expect(response.body).to.be.an('object');
              expect(response).to.have.status(400);
              expect(response.body.status).to.equal(400);
              expect(response.body.error).to.be.a('string');
              expect(response.body.error).to.equal('Identification card number is required');
              done();
            });
        },
      );
    });
    describe('Testing create bank account controller for user that signed in', () => {
      let clientToken;
      const signinUrl = '/api/v1/auth/signin';
      const createAccountUrl = '/api/v1/accounts';
      it(
        'should create a new bank account for user that signed in when all the required parameters are given',
        (done) => {
          chai.request(app)
            .post(signinUrl)
            .send({
              email: 'johndoe@gmail.com',
              password: 'olujuwondoke',
              typeOfUser: 'client',
            })
            .end((err, res) => {
              clientToken = res.body.data.token;
              chai.request(app)
                .post(createAccountUrl)
                .send({
                  accountType: 'current',
                  idCardType: 3,
                  idCardNumber: 'A09579734',
                })
                .set('authorization', `Bearer ${clientToken}`)
                .end((error, response) => {
                  expect(response.body).to.be.an('object');
                  expect(response).to.have.status(201);
                  expect(response.body.status).to.equal(201);
                  expect(response.body.data).to.be.a('object');
                  expect(response.body.data).to.have.property('accountNumber');
                  expect(response.body.data).to.have.property('firstName');
                  expect(response.body.data).to.have.property('lastName');
                  expect(response.body.data).to.have.property('email');
                  expect(response.body.data).to.have.property('type');
                  expect(response.body.data).to.have.property('openingBalance');
                  expect(response.body.data).to.have.property('idCardType');
                  expect(response.body.data).to.have.property('message');
                  done();
                });
            });
        },
      );

      it(
        'should not create a new bank account for user that signed in when account type is missing',
        (done) => {
          chai.request(app)
            .post(createAccountUrl)
            .send({
              idCardType: 3,
              idCardNumber: 'A09579734',
            })
            .set('authorization', `Bearer ${clientToken}`)
            .end((error, response) => {
              expect(response.body).to.be.an('object');
              expect(response).to.have.status(400);
              expect(response.body.status).to.equal(400);
              expect(response.body.error).to.be.a('string');
              expect(response.body.error).to.equal('Type of account (current or savings) is required');
              done();
            });
        },
      );

      it(
        'should not create a new bank account for user that signed in when identification card type is missing',
        (done) => {
          chai.request(app)
            .post(createAccountUrl)
            .send({
              accountType: 'current',
              idCardNumber: 'A09579734',
            })
            .set('authorization', `Bearer ${clientToken}`)
            .end((error, response) => {
              expect(response.body).to.be.an('object');
              expect(response).to.have.status(400);
              expect(response.body.status).to.equal(400);
              expect(response.body.error).to.be.a('string');
              expect(response.body.error).to.equal('Type of identification card is required');
              done();
            });
        },
      );

      it(
        'should not create a new bank account for user that signed in when identification card number is missing',
        (done) => {
          chai.request(app)
            .post(createAccountUrl)
            .send({
              accountType: 'current',
              idCardType: 3,
            })
            .set('authorization', `Bearer ${clientToken}`)
            .end((error, response) => {
              expect(response.body).to.be.an('object');
              expect(response).to.have.status(400);
              expect(response.body.status).to.equal(400);
              expect(response.body.error).to.be.a('string');
              expect(response.body.error).to.equal('Identification card number is required');
              done();
            });
        },
      );
    });
    // describe('Testing create bank account controller for non client sign-in', () => {
    //   let adminToken;
    //   const signinUrl = '/api/v1/auth/admin/login';
    //   const createAccountUrl = '/api/v1/accounts';
    //   it(
    //     'should not create a new bank account for user that signed in that is not a client',
    //     (done) => {
    //       chai.request(app)
    //         .post(signinUrl)
    //         .send({
    //           email: 'sky@gmail.com',
    //           password: '$2b$10$rgZSWmHmx51L/VYEU10TcOKYVhLdFBI.yVkbxWoNz529r1WbxPoAK',
    //           typeOfUser: 'admin',
    //         })
    //         .end((err, res) => {
    //           adminToken = res.body.data.token;
    //           chai.request(app)
    //             .post(createAccountUrl)
    //             .send({
    //               accountType: 'current',
    //               idCardType: 3,
    //               idCardNumber: 'A09579734',
    //             })
    //             .set('authorization', `Bearer ${clientToken}`)
    //             .end((error, response) => {
    //               expect(response.body).to.be.an('object');
    //               expect(response).to.have.status(403);
    //               expect(response.body.status).to.equal(403);
    //               expect(response.body.data).to.be.a('object');
    //               expect(response.body.data).to.have.property('message');
    //               expect(response.body.data.message).to.equal('Not Authorized');
    //               done();
    //             });
    //         });
    //     },
    //   );
    // });
  });
});

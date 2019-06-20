/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';
// import migrations from '../models/migration';

chai.use(chaiHttp);

describe('Testing Banka APIs Landing Pages', () => {
  // before(() => {
  //   migrations.createTables();
  // });

  describe('Testing Banka APIs Main Homepage', () => {
    const homePageUrl = '/';
    it(
      'should return a success welcome response when Banka APIs host endpoint is hit',
      (done) => {
        chai.request(app)
          .get(homePageUrl)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(200);
            expect(response.body.status).to.equal(200);
            expect(response.body.message).to.be.a('string');
            expect(response.body.message).to.equal('You\'re Welcome to Banka APIs');
            done();
          });
      },
    );
  });

  describe('Testing Banka APIs Version 1 Main Homepage', () => {
    const v1homePageUrl = '/api/v1';
    it(
      'should return a success welcome response when version 1 of Banka APIs host endpoint is hit',
      (done) => {
        chai.request(app)
          .get(v1homePageUrl)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(200);
            expect(response.body.status).to.equal(200);
            expect(response.body.message).to.be.a('string');
            expect(response.body.message).to.equal('You\'re Welcome to version 1 of Banka APIs');
            done();
          });
      },
    );
  });
});

/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing Banka APIs Landing Pages', () => {
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

    it('should return status 404 if route is not available on server', (done) => {
      chai.request(app)
        .get('/i-dont-exist/')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('This endpoint doesn\'t exist on this server');
          done();
        });
    });
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

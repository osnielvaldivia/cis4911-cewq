// Test environment
process.env.NODE_ENV = 'test';

// Imports
const request = require('supertest');
const { expect } = require('chai');

// Import server
const app = require('../server');

// Parent test suite
describe('API Test Suite', () => {
  let companyId = null;
  let ownerHeader = {
    'x-auth-token': null,
    'Content-Type': 'application/json',
  };

  // Test suite for company setup
  describe('Company setup', () => {
    describe('Login owner', () => {
      it('should return a signed jwt', () => {
        const body = {
          email: 'demoowner@gmail.com',
          password: 'RandomPass123',
        };
  
        return request(app)
          .post('/api/auth')
          .send(body)
          .expect('content-type', 'application/json; charset=utf-8')
          .expect(200)
          .then(res => {
            expect(res.body.token).to.not.be.null;
            ownerHeader['x-auth-token'] = res.body.token;
          });
      });
    });
  
    describe('Create company', () => {
      it('should create a company', () => {
        const body = {
          name: 'Test company',
        };
  
        return request(app)
          .post('/api/company')
          .send(body)
          .set(ownerHeader)
          .expect('content-type', 'application/json; charset=utf-8')
          .expect(200)
          .then(res => {
            expect(res.body.employees).to.be.empty;
            expect(res.body.admins).to.be.empty;
            expect(res.body.tickets).to.be.empty;
            expect(res.body._id).to.not.be.null;
            expect(res.body.name).to.be.equal(body['name']);
            expect(res.body.owner).to.not.be.null;
            expect(res.body.date).to.not.be.null;
  
            companyId = res.body._id;
          });
      });
    });
  });

  /* Test suit of stuff inside company here */

  // Test suite of company teardown
  describe('Company teardown', () => {
    describe('Delete test company', () => {
      it('should delete the test company', () => {
        return request(app)
          .del(`/api/company/${companyId}`)
          .set(ownerHeader)
          .expect('content-type', 'application/json; charset=utf-8')
          .expect(200)
          .then(res => {
            expect(res.body.msg).to.be.equal('Company deleted');
          });
      });
    });
  });
});

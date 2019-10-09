process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const jsYaml = require('js-yaml');
const fs = require('fs');
const appRoot = require('app-root-path');
const { OpenApiValidator } = require('express-openapi-validate');

// Database dependencies
const mongoose = require('mongoose');
const Company = require('../models/Company');

// Import server
const app = require('../server');

// Load the OpenAPI document
const openApiDocument = jsYaml.safeLoad(
  fs.readFileSync(`${appRoot}/spec/api.yaml`, 'utf-8')
);

// Create the validator from the spec document
const validator = new OpenApiValidator(openApiDocument, {});

describe('Company', function() {
  describe('/GET company', () => {
    // Create the response validator for the GET /company endpoint
    const validateResponse = validator.validateResponse('get', '/company');

    it('should GET all of the companies', async done => {
      const api = request(app);
      api.get('/company').expect(200);
      done();
    });
  });
});

//describe('index', function () {
//    // Create the response validator for the GET / endpoint
//    const validateResponse = validator.validateResponse('get', '/')
//
//    it('should return a valid response', function () {
//        return request(app)
//            .get('/')
//            .expect(200)
//            .then((res) => {
//                expect(validateResponse(res)).to.be.undefined //validate
//            })
//            .catch((err) => expect(err).to.be.undefined)
//    })
//})

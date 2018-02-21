const expect = require('expect');
const request = require('supertest');
const {app} = require('../server');

describe('server.js', ()=> {
    it ('should return a valid response for a valid request', (done) => {
        const validRequest = require('./requests/validRequest');
        const expectedResponse = require('./responses/expectedResponse');

        request(app)
        .post('/')
        .send(validRequest)
        .expect(200)
        .expect( (res) => {
            expect(res.body).toEqual(expectedResponse)
        })
        .end( (error, res) => {
            if (error) {
                return done(error);
            }

            done();
        });
    });

    it ('should return a valid response for addresses specified by longitude/lattitude', (done) => {
        const lonLatAddressRequest = require('./requests/lonLatAddressRequest');
        const geocodingResponse = require('./responses/geocodingResponse');

        request(app)
        .post('/')
        .send(lonLatAddressRequest)
        .expect(200)
        .expect( (res) => {
            expect(res.body).toEqual(geocodingResponse)
        })
        .end( (error, res) => {
            if (error) {
                return done(error);
            }

            done();
        });
    });

    it ('should return an empty array for a request with non htv type', (done) => {
        const wrongTypeRequest = require('./requests/wrongTypeRequest');
        const emptyResponse = require('./responses/emptyResponse');

        request(app)
        .post('/')
        .send(wrongTypeRequest)
        .expect(200)
        .expect( (res) => {
            expect(res.body).toEqual(emptyResponse)
        })
        .end( (error, res) => {
            if (error) {
                return done(error);
            }

            done();
        });
    });

    it ('should return an empty array for a request with not complete workflow', (done) => {
        const wrongWorkflowRequest = require('./requests/wrongWorkflowRequest');
        const emptyResponse = require('./responses/emptyResponse');

        request(app)
        .post('/')
        .send(wrongWorkflowRequest)
        .expect(200)
        .expect( (res) => {
            expect(res.body).toEqual(emptyResponse)
        })
        .end( (error, res) => {
            if (error) {
                return done(error);
            }

            done();
        });
    });

    it ('should return an error for an invalid JSON format', (done) => {
        const invalidJsonRequest = require('./requests/invalidJsonRequest');
        const errorResponse = require('./responses/errorResponse');

        request(app)
        .post('/')
        .send(invalidJsonRequest)
        .expect(400)
        .expect( (res) => {
            expect(res.body).toEqual(errorResponse)
        })
        .end( (error, res) => {
            if (error) {
                return done(error);
            }

            done();
        });
    });

    it ('should return an error for an invalid address', (done) => {
        const invalidAddressRequest = require('./requests/invalidAddressRequest');
        const errorResponse = require('./responses/errorResponse');

        request(app)
        .post('/')
        .send(invalidAddressRequest)
        .expect(400)
        .expect( (res) => {
            expect(res.body).toEqual(errorResponse)
        })
        .end( (error, res) => {
            if (error) {
                return done(error);
            }

            done();
        });
    });

    it ('should return an error for a missing address', (done) => {
        const missingAddressRequest = require('./requests/missingAddressRequest');
        const errorResponse = require('./responses/errorResponse');

        request(app)
        .post('/')
        .send(missingAddressRequest)
        .expect(400)
        .expect( (res) => {
            expect(res.body).toEqual(errorResponse)
        })
        .end( (error, res) => {
            if (error) {
                return done(error);
            }

            done();
        });
    });

    it ('should return an error for a missing type', (done) => {
        const missingTypeRequest = require('./requests/missingTypeRequest');
        const errorResponse = require('./responses/errorResponse');

        request(app)
        .post('/')
        .send(missingTypeRequest)
        .expect(400)
        .expect( (res) => {
            expect(res.body).toEqual(errorResponse)
        })
        .end( (error, res) => {
            if (error) {
                return done(error);
            }

            done();
        });
    });

    it ('should return an error for a missing workflow', (done) => {
        const missingWorkFlowRequest = require('./requests/missingWorkFlowRequest');
        const errorResponse = require('./responses/errorResponse');

        request(app)
        .post('/')
        .send(missingWorkFlowRequest)
        .expect(400)
        .expect( (res) => {
            expect(res.body).toEqual(errorResponse)
        })
        .end( (error, res) => {
            if (error) {
                return done(error);
            }

            done();
        });
    });
});
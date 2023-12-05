const supertest = require('supertest');
const app = require('../app/app.js');

var assert = require('assert');


describe('Testing our Application', function () {

    it('GET /healthz end point of the application to test sequelize', (done) => {
        supertest(app)
            .get('/v2/healthz')
            .expect(200)
            .end((err, response) => {
                if (err) return done(err)
                return done()
            })
    })
    
});




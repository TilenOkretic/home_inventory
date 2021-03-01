const super_test = require('supertest');

const app = require('../../app');


describe('GET /api/v1/companies', () => {
    it('should respond with an array of comapnies', async () => {
        const response = await super_test(app)
            .get('/api/v1/companies')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    });
});
const super_test = require('supertest');

const app = require('../../app');


describe('GET /api/v1/users', () => {
    it('should respond with an array of users', async () => {
        const response = await super_test(app)
            .get('/api/v1/users')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });
});
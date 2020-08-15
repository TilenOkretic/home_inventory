const super_test = require('supertest');

const app = require('../../app');


describe('GET /api/v1/states', () => {
    it('should respond with an array of states', async () => {
        const res = await super_test(app)
            .get('/api/v1/states')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toEqual([]);
    });
});
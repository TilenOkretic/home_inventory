const super_test = require('supertest');
const project = require('../constants/project');

const app = require('../app');


describe('GET /api/v1', () => {
    it('should respond with a message', async () => {
        const res = await super_test(app)
            .get('/api/v1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body.message).toEqual(project.message);
    });
});
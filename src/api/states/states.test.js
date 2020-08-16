const super_test = require('supertest');

const app = require('../../app');


describe('GET /api/v1/regijas', () => {
    it('should respond with an array of regijas', async () => {
        const response = await super_test(app)
            .get('/api/v1/regijas')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should respond with endividual regijas', async () => {
        const response = await super_test(app)
            .get('/api/v1/regijas/1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.id).toBe(1);
    });

    
    it('should respond with 404 for a not found regija', async () => {
        const response = await super_test(app)
            .get('/api/v1/regijas/99999')
            .expect('Content-Type', /json/)
            .expect(404);
    });
});
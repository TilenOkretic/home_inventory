const super_test = require('supertest');
const app = require('./app');
const project = require('./constants/project');


describe('GET /', () => {
    it('should responde with a message', async () => {
        const res = await super_test(app).get('/').expect('Content-Type', /json/).expect(200);
        
        expect(res.body.message).toEqual(project.message);
    });
});
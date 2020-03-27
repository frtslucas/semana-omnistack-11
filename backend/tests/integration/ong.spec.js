const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')
var ong = { id: 0 }
var incident = { id: 0 }

describe('ONG', () => {
    beforeAll(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be alo to create a new ONG', async () => {
        const responseCreate = await request(app)
            .post('/ongs')
            .send({
                name: "Nova ONG",
                email: "contato@teste.com",
                whatsapp: "4300000000",
                city: "Londrina",
                uf: "PR"
            })

        expect(responseCreate.body).toHaveProperty('id');
        expect(responseCreate.body.id).toHaveLength(8);

        ong.id = responseCreate.body.id;
    })

    it('should be able to log the ONG in', async () => {
        const responseLogin = await request(app)
            .post('/sessions')
            .send({
                id: `${ong.id}`
            });

        expect(responseLogin.body).toHaveProperty('name');
    })

    it('should be able to create a new incident', async () => {
        const responseNewIncident = await request(app)
            .post('/incidents')
            .set('Authorization', `${ong.id}`)
            .send({
                title: "Caso Teste",
                description: "Detalhes do caso",
                value: 120
            })

           expect(responseNewIncident.body).toHaveProperty('id')

           incident.id = responseNewIncident.body.id
    })

    it('should be able to delete an existing incident', async () => {
        const responseDeleteIncident = await request(app)
            .delete(`/incidents/${incident.id}`)
            .set('Authorization', `${ong.id}`)
            .send()

            expect(responseDeleteIncident.status).toBe(204)
    })
})
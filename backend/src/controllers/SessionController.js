// const connection = require('../database/connection')

// module.exports = {
//     async create(request, response) {
//         const { id } = request.body

//         const ong = await connection('ongs')
//             .where('id', id)
//             .select('name')
//             .first()

//         if (!ong) {
//             return response.status(400).json({ error: 'No ONG found with this ID'})
//         }

//         return response.json(ong)
//     }
// }

const express = require('express')
const User = require('../models/User')

const router = express.Router()

module.exports = {
    async register(request, response) {
        try {
            const user = await User.create(request.body)
    
            return response.send({ user })
        } catch (err) {
            return response.status(400).send({ error: 'Registration failed '})
        }
    }
}

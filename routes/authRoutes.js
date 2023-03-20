import express from 'express'
import authenticateUser from '../middleware/auth.js'
const router = express.Router()

import { register, login, updateUser } from '../controllers/authControllers.js'

router.post('/register', register)
router.post('/login', login)
router.patch('/', authenticateUser, updateUser)

export default router

import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'

import {
  register,
  login,
  getUser,
  logout,
} from '../controllers/authControllers.js'

router.get('/user', authenticateUser, getUser)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router

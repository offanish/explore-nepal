import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'

import {
  register,
  login,
  getPlaceOwner,
  getUser,
  logout,
  getUserPlaces,
} from '../controllers/authControllers.js'

router.get('/user', authenticateUser, getUser)
router.get('/user/:id', getPlaceOwner)
router.get('/user/:id/places', getUserPlaces)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router

import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'

import {
  addNewPlace,
  getAllPlaces,
  deletePlace,
  editPlace,
} from '../controllers/placeControllers.js'

router.post('/', authenticateUser, addNewPlace)
router.get('/', getAllPlaces)
router.patch('/:id', authenticateUser, editPlace)
router.delete('/:id', authenticateUser, deletePlace)

export default router

import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'

import {
  addNewPlace,
  getAllPlaces,
  deletePlace,
  editPlace,
} from '../controllers/placeControllers.js'

router.post('/', addNewPlace)
router.get('/', getAllPlaces)
router.patch('/:id', editPlace)
router.delete('/:id', deletePlace)

export default router

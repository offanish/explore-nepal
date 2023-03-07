import express from 'express'
const router = express.Router()

import authenticateUser from '../middleware/auth.js'

import {
  addNewPlace,
  getAllPlaces,
  deletePlace,
  editPlace,
  getPlaceById,
} from '../controllers/placeControllers.js'

router.route('/').get(getAllPlaces).post(authenticateUser, addNewPlace)
router
  .route('/:id')
  .get(getPlaceById)
  .patch(authenticateUser, editPlace)
  .delete(authenticateUser, deletePlace)

export default router

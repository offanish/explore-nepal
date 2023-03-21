import express from 'express'
import { upload } from '../config/cloudinaryConfig.js'

const router = express.Router()

import authenticateUser from '../middleware/auth.js'

import {
  addNewPlace,
  getAllPlaces,
  deletePlace,
  editPlace,
  getPlaceById,
  getMyPlaces,
  addNewReview,
  getPlaceReviews,
} from '../controllers/placeControllers.js'

router
  .route('/')
  .get(getAllPlaces)
  .post(authenticateUser, upload.array('image'), addNewPlace)

router.get('/user', authenticateUser, getMyPlaces)

router
  .route('/:id')
  .get(getPlaceById)
  .patch(authenticateUser, upload.array('image'), editPlace)
  .delete(authenticateUser, deletePlace)

router
  .route('/:id/reviews')
  .get(getPlaceReviews)
  .post(authenticateUser, addNewReview)

export default router

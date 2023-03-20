import express from 'express'
import multer from 'multer'
import path from 'path'

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png') &&
      req.headers['content-length'] < 50000000
    ) {
      return cb(null, true)
    }
    return cb(null, false)
  },
})

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

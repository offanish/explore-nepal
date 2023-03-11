import express from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import ExpressError from '../errors/ExpressError.js'
import checkPermissions from '../utils/checkPermissions.js'
import Place from '../models/Place.js'
const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
export const upload = multer({
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

router.post('/', upload.single('image'), (req, res) => {
  try {
    res.json(req.file.filename)
  } catch (error) {
    next(error)
  }
})

router.delete('/:image', async (req, res) => {
  try {
    const { image } = req.params
    fs.unlink(`public/images/${image}`, (error) => {
      if (error) {
        console.log(error)
        throw new ExpressError(500, 'Error deleting file')
      }
      res.status(200).json({ msg: 'Deleted file successfully' })
    })
  } catch (error) {
    next(error)
  }
})

export default router

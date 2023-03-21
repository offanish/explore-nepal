import dotenv from 'dotenv'
import multer from 'multer'
import DataURIParser from 'datauri/parser.js'
import path from 'path'
import cloudinary from 'cloudinary'

dotenv.config()

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = multer.memoryStorage()

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

const dataUri = (file) => {
  const parser = new DataURIParser()
  return parser.format(path.extname(file.originalname).toString(), file.buffer)
}

export { cloudinary, upload, dataUri }

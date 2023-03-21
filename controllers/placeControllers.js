import fs from 'fs'
import Place from '../models/Place.js'
import ExpressError from '../errors/ExpressError.js'
import checkPermissions from '../utils/checkPermissions.js'
import Review from '../models/Review.js'
import { cloudinary, dataUri, upload } from '../config/cloudinaryConfig.js'

const getAllPlaces = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    const allPlaces = await Place.find(keyword)
    res.status(200).json(allPlaces)
  } catch (error) {
    next(error)
  }
}

const getPlaceById = async (req, res, next) => {
  try {
    const { id } = req.params
    const place = await Place.findById(id).populate('createdBy', 'name')
    if (!place) {
      throw new ExpressError(404, 'Place not found')
    }
    place.createdBy.email = undefined
    res.status(200).json(place)
  } catch (error) {
    next(error)
  }
}

const addNewPlace = async (req, res, next) => {
  try {
    const { name, location, description } = req.body
    if (!name || !location || !description) {
      throw new ExpressError(400, 'Please provide all values')
    }
    //file upload to cloudinary
    const files = await Promise.all(
      req.files.map(async (file) => {
        const fileUri = dataUri(file).content
        const uploadedFile = await cloudinary.v2.uploader.upload(fileUri, {
          folder: 'explore-nepal',
        })
        console.log(uploadedFile)
        return { url: uploadedFile.url, publicId: uploadedFile.public_id }
      })
    )
    req.body.image = files
    req.body.createdBy = req.user.userId
    const place = await Place.create(req.body)
    res.status(201).json(place)
  } catch (error) {
    next(error)
  }
}

const editPlace = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, location, description } = req.body
    const oldImages = JSON.parse(req.body.oldImages)

    //file upload to cloudinary
    const newImages = await Promise.all(
      req.files.map(async (file) => {
        const fileUri = dataUri(file).content
        const uploadedFile = await cloudinary.v2.uploader.upload(fileUri, {
          folder: 'explore-nepal',
        })
        return { url: uploadedFile.url, publicId: uploadedFile.public_id }
      })
    )

    if (!name || !location || !description) {
      throw new ExpressError(400, 'Please provide all values')
    }
    if (!oldImages.length && !newImages.length) {
      throw new ExpressError(400, 'Please upload at least one image')
    }
    const place = await Place.findOne({ _id: id })
    if (!place) {
      throw new ExpressError(404, 'Place not found')
    }

    checkPermissions(req.user.userId, place.createdBy)
    // delete image from cloud
    const deletedImages = place.image.filter((img) => {
      return !oldImages.includes(img.url)
    })
    if (deletedImages.length) {
      await cloudinary.v2.api.delete_resources(
        deletedImages.map((img) => img.publicId)
      )
    }

    place.image.pull(...deletedImages)
    place.image.push(...newImages)
    place.name = name
    place.location = location
    place.description = description

    const newPlace = await place.save()
    res.status(200).json(newPlace)
  } catch (error) {
    next(error)
  }
}

const deletePlace = async (req, res, next) => {
  try {
    const { id } = req.params
    const place = await Place.findOne({ _id: id })
    if (!place) {
      throw new ExpressError(404, 'Place not found')
    }
    checkPermissions(req.user.userId, place.createdBy)
    await cloudinary.v2.api.delete_resources(
      place.image.map((img) => img.publicId)
    )
    await place.remove()
    await Review.deleteMany({ placeId: id })
    res.status(204).json({ msg: 'Place deleted successfully' })
  } catch (error) {
    next(error)
  }
}

const addNewReview = async (req, res, next) => {
  try {
    const { id } = req.params
    const { rating, comment } = req.body
    if (!rating) {
      throw new ExpressError(400, 'Please provide a rating')
    }
    const place = await Place.findById(id)
    if (!place) {
      throw new ExpressError(404, 'Place not found')
    }
    const alreadyReviewed = await Review.find({
      createdBy: req.user.userId,
      placeId: id,
    })
    if (alreadyReviewed.length) {
      throw new ExpressError(400, 'Already reviewed this place')
    }

    req.body.createdBy = req.user.userId
    req.body.placeId = id

    const review = new Review(req.body)
    place.reviews.push(review._id)

    await review.save()
    await place.save()
    res.status(201).json(review)
  } catch (error) {
    next(error)
  }
}

const getMyPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({ createdBy: req.user.userId })
    res.status(200).json(places)
  } catch (error) {
    next(error)
  }
}

const getPlaceReviews = async (req, res, next) => {
  try {
    const { id } = req.params
    const reviews = await Review.find({ placeId: id }).populate(
      'createdBy',
      'name'
    )
    res.status(200).json(reviews)
  } catch (error) {
    next(error)
  }
}

export {
  addNewPlace,
  getAllPlaces,
  deletePlace,
  editPlace,
  getPlaceById,
  getMyPlaces,
  addNewReview,
  getPlaceReviews,
}

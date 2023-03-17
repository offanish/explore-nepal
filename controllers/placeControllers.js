import fs from 'fs'
import Place from '../models/Place.js'
import ExpressError from '../errors/ExpressError.js'
import checkPermissions from '../utils/checkPermissions.js'
import Review from '../models/Review.js'

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
    req.body.image = req.files.map((file) => file.filename)
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
    const newImages = req.files.map((file) => file.filename)
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

    const deletedImages = place.image.filter((img) => {
      return !oldImages.includes(img)
    })

    deletedImages.map((img) => {
      fs.unlink(`public/images/${img}`, (error) => {
        if (error) {
          throw new ExpressError(422, 'Unable to delete image')
        }
      })
    })

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
    place.image.map((img) => {
      fs.unlink(`public/images/${img}`, (error) => {
        if (error) {
          throw new ExpressError(500, 'Unable to delete image')
        }
      })
    })
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
  addNewReview,
  getPlaceReviews,
}

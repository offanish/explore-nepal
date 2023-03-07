import Place from '../models/Place.js'
import ExpressError from '../errors/ExpressError.js'
import checkPermissions from '../utils/checkPermissions.js'

const getAllPlaces = async (req, res, next) => {
  try {
    const allPlaces = await Place.find({})
    res.status(200).json(allPlaces)
  } catch (error) {
    next(error)
  }
}

const getPlaceById = async (req, res, next) => {
  try {
    const { id } = req.params
    const place = await Place.findById(id).populate('createdBy')
    place.createdBy.email = undefined
    if (!place) throw new ExpressError(404, 'Place not found')
    res.status(200).json(place)
  } catch (error) {
    next(error)
  }
}

const addNewPlace = async (req, res, next) => {
  try {
    const { name, location, image, description } = req.body
    if (!name || !location || !image || !description) {
      throw new ExpressError(400, 'Please provide all values')
    }
    req.body.createdBy = req.user.userId
    const place = await Place.create(req.body)
    res.status(201).json(place)
  } catch (error) {
    next(error)
  }
}

const editPlace = async (req, res, next) => {
  try {
    console.log(req.body)
    const { id } = req.params
    const { name, location, description } = req.body
    if (!name || !location || !description) {
      throw new ExpressError(400, 'Please provide all values')
    }
    const place = await Place.findOne({ _id: id })
    if (!place) {
      throw new ExpressError(404, 'Place not found')
    }
    checkPermissions(req.user.userId, place.createdBy)
    const newPlace = await Place.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ newPlace })
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
    await place.remove()
    res.status(204).json({ msg: 'Place deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export { addNewPlace, getAllPlaces, deletePlace, editPlace, getPlaceById }

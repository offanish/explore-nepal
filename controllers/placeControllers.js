import Place from '../models/Place.js'
import ExpressError from '../errors/ExpressError.js'

const addNewPlace = async (req, res, next) => {
  try {
    const { name, location, image, description } = req.body
    if (!name || !location || !image || !description) {
      throw new ExpressError(400, 'Please provide all values')
    }
    req.body.createdBy = req.user.userId
    req.body.creatorName = req.user.userName
    const place = await Place.create(req.body)
    res.status(201).json({ place })
  } catch (error) {
    next(error)
  }
}

const getAllPlaces = async (req, res, next) => {
  try {
    const allPlaces = await Place.find({})
    res.status(200).json({ allPlaces })
  } catch (error) {
    next(error)
  }
}

const editPlace = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, location, description } = req.body
    if (!name || !location || !description) {
      throw new ExpressError(400, 'Please provide all values')
    }
    const place = await Place.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    })
    res.status(200).json({ place })
  } catch (error) {
    next(error)
  }
}

const deletePlace = async (req, res, next) => {
  try {
    const { id } = req.params
    await Place.findOneAndDelete({ _id: id })
    res.status(204).json({ msg: 'Place deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export { addNewPlace, getAllPlaces, deletePlace, editPlace }

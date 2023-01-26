import ExpressError from '../errors/ExpressError.js'
import User from '../models/User.js'
import Place from '../models/Place.js'

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.user
    const user = await User.findOne({ _id: userId })
    user.password = undefined
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

const getPlaceOwner = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ _id: id })
    user.email = undefined
    user.password = undefined
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}
const getUserPlaces = async (req, res, next) => {
  try {
    const { id } = req.params
    const places = await Place.find({ createdBy: id })
    if (!places) {
      throw new ExpressError(404, 'Places not found')
    }
    res.status(200).json({ places })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      throw new ExpressError(400, 'Please provide all the values')
    }
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
      throw new ExpressError(400, 'Email already in use')
    }
    const user = await User.create(req.body)
    const token = user.createJWT()
    user.password = undefined
    res
      .status(201)
      .cookie('token', `Bearer ${token}`, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
      })
      .json({ user })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new ExpressError(400, 'Please provide all the values')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      throw new ExpressError(401, 'Incorrect email or password')
    }
    const isCorrectPassword = await user.comparePassword(password)
    if (!isCorrectPassword) {
      throw new ExpressError(401, 'Incorrect email or password')
    }
    const token = user.createJWT()
    user.password = undefined
    res
      .status(200)
      .cookie('token', `Bearer ${token}`, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
      })
      .json({ user })
  } catch (error) {
    next(error)
  }
}
const logout = async (req, res, next) => {
  try {
    res
      .clearCookie('token', { httpOnly: true })
      .status(200)
      .json({ msg: 'logged out successfully' })
  } catch (error) {
    next(error)
  }
}

export { register, login, getUser, logout, getPlaceOwner, getUserPlaces }

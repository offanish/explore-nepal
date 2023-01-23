import ExpressError from '../errors/ExpressError.js'
import User from '../models/User.js'

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
    res.status(201).json({ user, token })
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
    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

export { register, login }

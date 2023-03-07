import jwt from 'jsonwebtoken'
import ExpressError from '../errors/ExpressError.js'

const auth = (req, res, next) => {
  try {
    const fullToken = req.headers.authorization
    if (!fullToken || !fullToken.startsWith('Bearer')) {
      throw new ExpressError(401, 'User must be Signed In')
    }
    const token = fullToken.split(' ')[1]
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      req.user = { userId: payload.userId, userName: payload.userName }
      next()
    } catch (error) {
      throw new ExpressError(401, 'User must be Signed In')
    }
  } catch (error) {
    next(error)
  }
}

export default auth

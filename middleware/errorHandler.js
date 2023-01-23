const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  const defaultError = {
    message: err.message || 'Something went wrong, try again later',
    statusCode: err.statusCode || 500,
  }

  if (err.name === 'ValidationError') {
    defaultError.statusCode = 400
    defaultError.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ')
  }
  if (err.code === 11000) {
    defaultError.statusCode = 400
    defaultError.message = `${Object.keys(err.keyValue)[0]} has to be unique`
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.message })
}

export default errorHandlerMiddleware

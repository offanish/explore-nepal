//.env config
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import connectDB from './db/connect.js'

//route import
import placeRouter from './routes/placeRoutes.js'
import authRouter from './routes/authRoutes.js'

//middleware import
import notFoundMiddleware from './middleware/notFound.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'

app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use('/api/places', placeRouter)
app.use('/api/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const startServer = async () => {
  try {
    await connectDB()
    console.log('Database successfully connected')
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
startServer()

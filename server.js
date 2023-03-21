import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import connectDB from './db/connect.js'

//route import
import placeRouter from './routes/placeRoutes.js'
import authRouter from './routes/authRoutes.js'

//middleware import
import notFoundMiddleware from './middleware/notFound.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'

//config
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
const __dirname = path.resolve()

app.use('/api/places', placeRouter)
app.use('/api/auth', authRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

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

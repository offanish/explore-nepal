import mongoose from 'mongoose'

const connectDB = async () => {
  const url = process.env.DB_URL
  mongoose.set('strictQuery', false)
  return mongoose.connect(url)
}

export default connectDB

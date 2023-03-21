import mongoose from 'mongoose'
import Place from '../models/Place.js'
import User from '../models/User.js'
import data from './data.js'
import dotenv from 'dotenv'
dotenv.config()

const connect = async () => {
  const url = process.env.DB_URL
  mongoose.set('strictQuery', false)
  await mongoose.connect(url)
  console.log('database connected')
}
connect()

const importData = async () => {
  try {
    await Place.deleteMany()
    await User.deleteMany()
    const user = new User({
      _id: '63c780dc3811b9fbfd25e819',
      name: 'Anish',
      email: 'anish@gmail.com',
      password: 'secret',
    })
    await user.save()
    await Place.insertMany(data)
    console.log('Data imported successfully')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

importData()

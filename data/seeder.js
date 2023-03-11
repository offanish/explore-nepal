import mongoose from 'mongoose'
import Place from '../models/Place.js'
import data from './data.js'

const connect = async () => {
  mongoose.set('strictQuery', false)
  await mongoose.connect('mongodb://127.0.0.1:27017/placesDB')
  console.log('database connected')
}
connect()

const importData = async () => {
  try {
    await Place.deleteMany()
    await Place.insertMany(data)
    console.log('Data imported successfully')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

importData()

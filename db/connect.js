import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  return mongoose.connect('mongodb://127.0.0.1:27017/placesDB');
};

export default connectDB;

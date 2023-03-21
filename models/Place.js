import mongoose from 'mongoose'

const PlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide place name'],
    },
    location: {
      type: String,
      required: [true, 'Please provide location'],
    },
    image: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Place', PlaceSchema)

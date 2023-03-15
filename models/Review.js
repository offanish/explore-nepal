import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Rating required'],
      enum: [1, 2, 3, 4, 5],
    },
    comment: {
      type: String,
    },
    placeId: {
      type: mongoose.Types.ObjectId,
      ref: 'Place',
      required: [true, 'Product Required'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Required'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Review', ReviewSchema)

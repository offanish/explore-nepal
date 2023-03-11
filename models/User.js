import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash
})

UserSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password)
  return isMatch
}

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userName: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '5d',
    }
  )
}

export default mongoose.model('User', UserSchema)

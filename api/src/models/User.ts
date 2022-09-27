import mongoose, { Document } from 'mongoose'

enum UserRole {
  Admin,
  Customer,
}

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
  banned: boolean
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
    enum: UserRole,
  },
  banned: {
    type: Boolean,
    required: true,
    default: false,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)

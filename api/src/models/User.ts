import mongoose, { Document } from 'mongoose'

enum UserRole {
  Admin,
  Customer,
}

export type UserDocument = Document & {
  first_name: string
  lastName: string
  email: string
  password: string
  role: UserRole
  banned: boolean
}

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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

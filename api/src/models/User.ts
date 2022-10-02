import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'

enum UserRole {
  Admin = 'admin',
  Customer = 'customer',
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
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: UserRole,
    default: UserRole.Customer,
  },
  banned: {
    type: Boolean,
    required: true,
    default: false,
  },
})

// password encryption before saving a document
userSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 12)
})

export default mongoose.model<UserDocument>('User', userSchema)

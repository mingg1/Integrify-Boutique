import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'

export enum UserRole {
  Admin = 'admin',
  Customer = 'customer',
}

enum Permission {
  ProductsRead = 'products-read',
  ProductsWrite = 'products-write',
  UsersRead = 'users-read',
  UsersWrite = 'users-write',
}

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password?: string
  role: UserRole
  banned: boolean
  permissions?: Permission[]
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
  permissions: {
    type: [String],
    enum: Permission,
  },
})

// password encryption before saving a document
userSchema.pre('save', async function () {
  if (this.password && this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 12)
})

export default mongoose.model<UserDocument>('User', userSchema)

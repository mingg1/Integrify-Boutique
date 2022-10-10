import bcrypt from 'bcrypt'
import User, { UserDocument } from '../models/User'
import { NotFoundError, BadRequestError } from '../helpers/apiError'

const create = async (
  userInput: UserDocument & { pwConfirmation: string }
): Promise<UserDocument> => {
  const { firstName, lastName, email, password, pwConfirmation, role } =
    userInput
  if (password !== pwConfirmation) {
    throw new BadRequestError('Password confirmation does not match')
  }
  if (await User.exists({ email })) {
    throw new BadRequestError('This email is already taken')
  }

  return await User.create({ firstName, lastName, email, password, role })
}

const findById = async (userId: string): Promise<Partial<UserDocument>> => {
  const foundUser = await User.findById(userId, { password: 0 })
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findByEmail = async (
  email: string
): Promise<Partial<UserDocument> | null> => {
  const foundUser = await User.findOne({ email })
  if (!foundUser) {
    throw new NotFoundError(`User ${email} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find({}, { password: 0 }).sort({ name: 1 })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
    projection: { password: 0 },
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
  newPwConfirmation: string
): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  if (!foundUser.password) {
    throw new NotFoundError('This user doesn\'t have password')
  }

  const samePassword = await bcrypt.compare(currentPassword, foundUser.password)

  if (!samePassword) {
    throw new BadRequestError('Current password is not correct')
  }
  if (newPassword !== newPwConfirmation) {
    throw new BadRequestError('Password confirmation does not match')
  }
  foundUser.password = newPassword
  await foundUser.save()
  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

export default {
  create,
  findById,
  findByEmail,
  findAll,
  update,
  deleteUser,
  updatePassword,
}

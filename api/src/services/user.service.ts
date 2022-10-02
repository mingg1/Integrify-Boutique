import bcrypt from 'bcrypt'
import User, { UserDocument } from '../models/User'
import { NotFoundError, BadRequestError } from './../helpers/apiError'

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
  return await User.create(
    new User({ firstName, lastName, email, password, role })
  )
}

const findById = async (userId: string): Promise<Partial<UserDocument>> => {
  const foundUser = await User.findById(userId, { password: 0 })
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
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
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const updatePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
  newPwConfirmation: string
): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  const samePassword = await bcrypt.compare(oldPassword, foundUser.password)
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
  findAll,
  update,
  deleteUser,
  updatePassword,
}

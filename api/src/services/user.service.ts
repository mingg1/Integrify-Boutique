import bcrypt from 'bcrypt'
import User, { UserDocument } from '../models/User'
import Order, { Item, OrderDocument } from './../models/Order'
import { NotFoundError, BadRequestError } from '../helpers/apiError'
import Size from '../models/Size'

// const createOrderList = async (
//   userId: Types.ObjectId
// ): Promise<OrderDocument> => {
//   return await Order.create({ user: userId })
// }

export type CreateUserInput = Pick<
  UserDocument,
  'firstName' | 'lastName' | 'email' | 'password'
> & { pwConfirmation: string }

const addOrder = async (
  userId: string,
  items: Item[]
): Promise<OrderDocument> => {
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  const order = await Order.create({
    user: userId,
    items,
  })

  items.forEach(async (item) => {
    const foundSize = await Size.findById(item.size)
    if (foundSize?.quantity) {
      foundSize.quantity -= item.quantity
      foundSize.save()
    }
  })

  foundUser.orders.push(order._id)
  foundUser.save()
  return order.populate([
    'user',
    { path: 'items', populate: { path: 'product' } },
  ])
}

const getOrderList = async (
  userId: string
): Promise<OrderDocument[] | null> => {
  const orderList = await Order.find({ user: userId }).populate([
    'user',
    { path: 'items', populate: { path: 'product' } },
    { path: 'items', populate: { path: 'size' } },
  ])
  return orderList
}

const getAllOrders = async (): Promise<OrderDocument[] | null> => {
  const orderList = await Order.find().populate([
    'user',
    { path: 'items', populate: { path: 'product' } },
    { path: 'items', populate: { path: 'size' } },
  ])
  return orderList
}

const create = async (userInput: CreateUserInput): Promise<UserDocument> => {
  const { firstName, lastName, email, password, pwConfirmation } = userInput
  if (password !== pwConfirmation) {
    throw new BadRequestError('Password confirmation does not match')
  }
  if (await User.exists({ email })) {
    throw new BadRequestError('This email is already taken')
  }
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  })
  // const orderList = await createOrderList(newUser._id)
  // newUser.orders = orderList._id
  return newUser
}

const findById = async (userId: string): Promise<Partial<UserDocument>> => {
  const foundUser = await User.findById(userId, { password: 0 }).populate({
    path: 'orders',
    populate: { path: 'user', model: User },
  })
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findByEmail = async (
  email: string
): Promise<Partial<UserDocument> | null> => {
  const foundUser = await User.findOne({ email })

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find({}, { password: 0 })
    .sort({ name: 1 })
    .populate({
      path: 'orders',
      populate: { path: 'user', model: User },
    })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  if (await User.exists({ email: update.email })) {
    throw new BadRequestError('This email is already taken')
  }
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
  const foundUser = await User.findByIdAndDelete(userId)
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
  addOrder,
  getOrderList,
  getAllOrders,
}

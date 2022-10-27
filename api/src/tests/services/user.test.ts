import { NotFoundError } from './../../helpers/apiError'
import { UserDocument, UserRole } from './../../models/User'
import userService, { CreateUserInput } from '../../services/user.service'
import connect, { MongodHelper } from './../../helpers/db-helper'

const userInfo: CreateUserInput = {
  firstName: 'FirstName',
  lastName: 'LastName',
  email: 'test@test.com',
  password: 'password',
  pwConfirmation: 'password',
}

describe('User service', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a user', async () => {
    const newCustomerUser = await userService.create(userInfo)
    expect(newCustomerUser).toHaveProperty('_id')
    expect(newCustomerUser).toHaveProperty('role', 'customer')
  })

  it('should find a user by id', async () => {
    const user = await userService.create(userInfo)
    const foundUser = await userService.findById(user._id)
    expect(foundUser.email).toEqual(user.email)
  })

  it('should find a user by email', async () => {
    await userService.create(userInfo)
    const foundUser = await userService.findByEmail(userInfo.email)
    expect(foundUser?.email).toBe(userInfo.email)
  })

  it('should find all users', async () => {
    await userService.create(userInfo)
    await userService.create({
      ...userInfo,
      email: 'another@test.com',
    })
    const users = await userService.findAll()

    expect(users.length).toBe(2)
  })

  it('should update a user information', async () => {
    const user = await userService.create(userInfo)
    const updateField = {
      firstName: 'New Name',
      role: UserRole.Admin,
      email: 'admin@test.com',
    }
    const updatedUser = await userService.update(user._id, updateField)

    expect(updatedUser).toHaveProperty('_id', user._id)
    expect(updatedUser).toHaveProperty('firstName', updateField.firstName)
    expect(updatedUser).toHaveProperty('role', updateField.role)
    expect(updatedUser).toHaveProperty('email', updateField.email)
  })

  it('should delete a user', async () => {
    const user = await userService.create(userInfo)
    await userService.deleteUser(user._id)
    try {
      await userService.findById(user._id)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
    }
  })

  it('should update user\'s password', async () => {
    const user = await userService.create(userInfo)
    const updatedUser = await userService.updatePassword(
      user._id,
      userInfo.password!,
      'newPw',
      'newPw'
    )
    expect(updatedUser).toHaveProperty('_id', user._id)
  })
})

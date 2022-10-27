import request from 'supertest'
import app from '../../app'
import { CreateUserInput } from './../../services/user.service'
import connect, { MongodHelper } from './../../helpers/db-helper'

const userInfo: CreateUserInput = {
  firstName: 'FirstName',
  lastName: 'LastName',
  email: 'test@test.com',
  password: 'password',
  pwConfirmation: 'password',
}

describe('Auth controller', () => {
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

  it('should log in a user', async () => {
    //create a user first
    await request(app).post('/api/v1/users').send(userInfo)
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: userInfo.email, password: userInfo.password! })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
  })
})

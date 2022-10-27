import { checkCurrentUser } from './../../middlewares/checkAuth'
import request from 'supertest'
import app from '../../app'
import { CreateUserInput } from './../../services/user.service'
import connect, { MongodHelper } from './../../helpers/db-helper'
import { NextFunction, Request, Response } from 'express'

const userInfo: CreateUserInput = {
  firstName: 'FirstName',
  lastName: 'LastName',
  email: 'test@test.com',
  password: 'password',
  pwConfirmation: 'password',
}

describe('User controller', () => {
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
    const res = await request(app).post('/api/v1/users').send(userInfo)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('email', 'test@test.com')
  })

  it('should not create a user with incorrect password confirmation', async () => {
    const testInput = { ...userInfo, pwConfirmation: 'incorrect pw' }
    const res = await request(app).post('/api/v1/users').send(testInput)

    expect(res.statusCode).toBe(400)
    expect(res.body.status).toBe('error')
    expect(res.body.message).toBe('Password confirmation does not match')
  })

  it('should not create a user with already exist email', async () => {
    await request(app).post('/api/v1/users').send(userInfo)
    const testInput = { ...userInfo, firstName: 'Another', lastName: 'User' }
    const res = await request(app).post('/api/v1/users').send(testInput)

    expect(res.body.status).toBe('error')
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('This email is already taken')
  })
})

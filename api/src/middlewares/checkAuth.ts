import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserDocument, UserRole } from './../models/User'
import { JWT_SECRET } from './../util/secrets'
import { ForbiddenError } from './../helpers/apiError'

export const checkAdmin = (req: Request, _: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new ForbiddenError('No access token!')

    const authToken = authHeader.split(' ')[1]
    const decodedUser = jwt.verify(authToken, JWT_SECRET) as JwtPayload &
      Partial<UserDocument>

    if (decodedUser.role !== UserRole.Admin)
      throw new ForbiddenError('You do not have access to this data')

    return next()
  } catch (error) {
    throw new ForbiddenError((error as Error).message)
  }
}

export const checkCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const authHeader = req.headers.authorization
    if (!authHeader) throw new ForbiddenError('No access token!')

    const authToken = authHeader.split(' ')[1]
    const decodedUser = jwt.verify(authToken, JWT_SECRET) as JwtPayload &
      Partial<UserDocument>

    if (decodedUser._id !== id)
      throw new ForbiddenError('You cannot edit data which is not yours')

    return next()
  } catch (error) {
    throw new ForbiddenError((error as Error).message)
  }
}

import { UserDocument, UserRole } from './../models/User'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from './../util/secrets'
import { ForbiddenError } from './../helpers/apiError'

const checkAuth = (req: Request, _: Response, next: NextFunction) => {
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

export default checkAuth

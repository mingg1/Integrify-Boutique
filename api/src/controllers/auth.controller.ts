import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserDocument } from './../models/User'
import { BadRequestError } from './../helpers/apiError'
import { JWT_SECRET } from './../util/secrets'
import passport from 'passport'

export const generateAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as UserDocument

  if (!user) {
    return next(new BadRequestError('No user found'))
  }
  const token = jwt.sign(
    {
      _id: user?._id,
      role: user?.role,
      firstName: user?.firstName,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  return res.json({ token })
}

export const localAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: UserDocument, info?: { message: string }) => {
      if (info) return next(new BadRequestError(info.message))
      if (err) return next(err)

      req.login(user, { session: false }, (err: Error) => {
        return next(err ? err : null)
      })
    }
  )(req)
}

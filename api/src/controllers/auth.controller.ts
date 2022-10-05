import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserDocument } from './../models/User'
import { JWT_SECRET } from './../util/secrets'

export const generateAccessToken = (req: Request, res: Response) => {
  const user = req.user ? (req.user as UserDocument) : undefined

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

import express from 'express'
import passport from 'passport'
import { validate, localLoginSchema } from './../middlewares/schemaValidation'
import { localAuth } from './../controllers/auth.controller'
import { generateAccessToken } from '../controllers/auth.controller'

const router = express.Router()

router.post(
  '/login',
  validate(localLoginSchema),
  localAuth,
  generateAccessToken
)
router.post(
  '/login-google',
  passport.authenticate('google-id-token', { session: false }),
  generateAccessToken
)

export default router

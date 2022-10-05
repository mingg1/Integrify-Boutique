import { generateAccessToken } from './../controllers/auth.controller'
import express from 'express'
import passport from 'passport'

const router = express.Router()

// Login with password will be added
// router.post('/login')
router.post(
  '/login-google',
  passport.authenticate('google-id-token', { session: false }),
  generateAccessToken
)

export default router

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import loginWithGoogle from './passport/google'
import loginWithPassword from './passport/local'
import userRouter from './routers/user.router'
import productRouter from './routers/product.router'
import authRouter from './routers/auth.router'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(cors({ origin: '*' }))
app.use(apiContentType)
app.use(express.json())
app.use(passport.initialize())

passport.use(loginWithGoogle())
passport.use(loginWithPassword())

// Set up routers
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app

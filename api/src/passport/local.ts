import { Strategy as Localstrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import userService from '../services/user.service'

export default () =>
  new Localstrategy(
    { usernameField: 'email', session: false },
    async (email, password, done) => {
      try {
        const user = await userService.findByEmail(email)
        if (!user) {
          return done(null, false, { message: 'incorrect username' })
        }
        if (user.password === undefined) {
          return done(null, false, { message: 'Try another login method' })
        }

        const samePassword = await bcrypt.compare(password, user.password!)

        if (!samePassword) {
          return done(null, false, {
            message: 'Incorrect password',
          })
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )

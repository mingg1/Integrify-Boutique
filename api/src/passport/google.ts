import GoogleTokenStrategy from 'passport-google-id-token'
import User from '../models/User'
import userService from '../services/user.service'
import { GOOGLE_CLIENT_ID } from '../util/secrets'
import { ParsedToken, VerifiedCallback } from './../util/types'

export default () => {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        const {
          given_name: firstName,
          family_name: lastName,
          email,
        } = parsedToken.payload
        let user = await userService.findByEmail(parsedToken.payload.email)
        if (!user) {
          user = await User.create(
            new User({
              firstName: firstName.split(' ')[0],
              lastName,
              email,
            })
          )
        }
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}

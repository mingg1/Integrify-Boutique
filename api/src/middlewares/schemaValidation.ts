import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, z } from 'zod'

export const signUpSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'Full name is required',
    }),
    lastName: z.string({
      required_error: 'lastName is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z.string({
      required_error: 'password is required',
    }),
    password2: z.string({
      required_error: 'password2 is required',
    }),
    role: z
      .string({
        invalid_type_error: 'invalid_type_error',
      })
      .optional(),
  }),
})

export const updateUserSchema = signUpSchema.optional()

export const updatePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'pw is required' }),
    newPassword: z.string({ required_error: ' is required' }),
    newPwConfirmation: z.string({ required_error: ' is required' }),
  }),
})

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      return res.status(400).json(error)
    }
  }

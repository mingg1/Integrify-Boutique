import { UserRole } from './../models/User'
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
    pwConfirmation: z.string({
      required_error: 'pwConfirmation is required',
    }),
    role: z.enum([UserRole.Admin, UserRole.Customer]).optional(),
  }),
})

export const localLoginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

export const updateUserSchema = signUpSchema.optional()

export const updatePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'Current password is required',
    }),
    newPassword: z.string({ required_error: 'New password is required' }),
    newPwConfirmation: z.string({
      required_error: 'New password confirmation is required',
    }),
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

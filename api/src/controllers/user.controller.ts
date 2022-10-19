import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'
import userService from '../services/user.service'

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await userService.addOrder(req.params.id, req.body.items)
    return res.json(order)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError(error.message, 400, error))
    } else {
      next(error)
    }
  }
}

// POST /users
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await userService.create(req.body)
    return res.json(newUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError(error.message, 400, error))
    } else {
      next(error)
    }
  }
}

// PATCH /users/:id
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { google, ...update } = req.body
    const userId = req.params.id
    const updatedUser = await userService.update(userId, update)
    if (update.hasOwnProperty('banned')) {
      return res.status(204).end()
    }
    req.user = updatedUser as Express.User
    req.authInfo = { google }
    next(null)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /users/:id
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.params.id)
    return res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users/:id
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await userService.findById(req.params.id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await userService.findByEmail(req.params.email))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await userService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PATCH /users/:id/change-password
export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id
    const { currentPassword, newPassword, newPwConfirmation } = req.body
    await userService.updatePassword(
      userId,
      currentPassword,
      newPassword,
      newPwConfirmation
    )
    return res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

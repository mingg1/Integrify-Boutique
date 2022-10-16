import express from 'express'
import {
  validate,
  signUpSchema,
  updatePasswordSchema,
} from './../middlewares/schemaValidation'
import {
  getAllUsers,
  signUp,
  getUserById,
  updateUser,
  deleteUser,
  updatePassword,
} from './../controllers/user.controller'
import { generateAccessToken } from './../controllers/auth.controller'
import { checkCurrentUser, checkAdmin } from './../middlewares/checkAuth'

const router = express.Router()

router
  .route('/')
  .get(checkAdmin, getAllUsers)
  .post(validate(signUpSchema), signUp)
router
  .route('/:id')
  .get(getUserById)
  .patch(checkCurrentUser, updateUser, generateAccessToken)
  .delete(checkAdmin, deleteUser)
router.patch(
  '/:id/change-password',
  checkAdmin,
  validate(updatePasswordSchema),
  updatePassword
)

export default router

import {
  validate,
  signUpSchema,
  updatePasswordSchema,
} from './../middlewares/schemaValidation'
import express from 'express'
import {
  getAllUsers,
  signUp,
  getUserById,
  updateUser,
  deleteUser,
  updatePassword,
} from './../controllers/user.controller'
import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router
  .route('/')
  .get(checkAuth, getAllUsers)
  .post(validate(signUpSchema), signUp)
router
  .route('/:id')
  .get(getUserById)
  .patch(checkAuth, updateUser)
  .delete(checkAuth, deleteUser)
router.patch(
  '/:id/change-password',
  checkAuth,
  validate(updatePasswordSchema),
  updatePassword
)

export default router

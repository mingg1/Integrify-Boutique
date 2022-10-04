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

const router = express.Router()

router.route('/').get(getAllUsers).post(validate(signUpSchema), signUp)
router.route('/login').post()
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser)
router.patch(
  '/:id/change-password',
  validate(updatePasswordSchema),
  updatePassword
)

export default router

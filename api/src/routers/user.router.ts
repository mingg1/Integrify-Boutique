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
  addOrder,
  getUserOrders,
  getAllOrders,
} from './../controllers/user.controller'
import { generateAccessToken } from './../controllers/auth.controller'
import { checkCurrentUser, checkAdmin } from './../middlewares/checkAuth'

const router = express.Router()

router
  .route('/')
  .get(checkAdmin, getAllUsers)
  .post(validate(signUpSchema), signUp)
router.get('/orders', getAllOrders)
router
  .route('/:id')
  .get(getUserById)
  .patch(checkCurrentUser, updateUser, generateAccessToken)
  .delete(checkCurrentUser, deleteUser)
router.patch(
  '/:id/change-password',
  checkCurrentUser,
  validate(updatePasswordSchema),
  updatePassword
)
router.patch('/:id/block', checkAdmin, updateUser)

router
  .route('/:id/orders')
  .post(checkCurrentUser, addOrder)
  .get(checkCurrentUser, getUserOrders)

export default router

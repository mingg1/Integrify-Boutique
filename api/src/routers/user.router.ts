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

router.route('/').get(getAllUsers).post(signUp)
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser)
router.patch('/:id/change-password', updatePassword)

export default router

import express from 'express'
import {
  getAllUsers,
  signUp,
  getUserById,
  updateUser,
  deleteUser,
} from './../controllers/user.controller'

const router = express.Router()

router.route('/').get(getAllUsers).post(signUp)
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser)

export default router

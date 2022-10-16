import express from 'express'
import { checkCurrentUser, checkAdmin } from './../middlewares/checkAuth'
import {
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  addProduct,
} from './../controllers/product.controller'

const router = express.Router()

router.route('/').get(getAllProducts).post(addProduct)
router
  .route('/:id')
  .get(getProductById)
  .patch(checkAdmin, updateProduct)
  .delete(checkAdmin, deleteProduct)

export default router

import express from 'express'
import { checkCurrentUser, checkAdmin } from './../middlewares/checkAuth'
import {
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  addProduct,
  search,
} from './../controllers/product.controller'

const router = express.Router()

router.route('/').get(getAllProducts).post(checkAdmin, addProduct)
router.get('/search', search)
router
  .route('/:id')
  .get(getProductById)
  .patch(checkAdmin, updateProduct)
  .delete(checkAdmin, deleteProduct)

export default router

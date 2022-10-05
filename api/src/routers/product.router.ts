import express from 'express'
import checkAuth from '../middlewares/checkAuth'
import {
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  addProduct,
} from './../controllers/product.controller'

const router = express.Router()

router.route('/').get(getAllProducts).post(checkAuth, addProduct)
router
  .route('/:id')
  .get(getProductById)
  .patch(checkAuth, updateProduct)
  .delete(checkAuth, deleteProduct)

export default router

import {
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
} from './../controllers/product.controller'
import express from 'express'

const router = express.Router()

router.route('/').get(getAllProducts)
router
  .route('/:id')
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct)

export default router

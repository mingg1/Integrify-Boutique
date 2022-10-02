import express from 'express'
import {
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
} from './../controllers/product.controller'

const router = express.Router()

router.route('/').get(getAllProducts)
router
  .route('/:id')
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct)

export default router

import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return await Product.create(product)
}

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found!`)
  }

  return foundProduct
}

const findAll = async (): Promise<ProductDocument[]> => {
  return Product.find().sort({ name: 1 })
}

const search = async (query: string): Promise<ProductDocument[]> => {
  //text index?
  const products = await Product.find().sort({ name: 1 })

  const filtered = products.filter((product: ProductDocument) => {
    const productInfo: ProductDocument = Object.values(product)[2]
    return Object.entries(productInfo).some(([_, value]) =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  })
  return filtered
}

const update = async (
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found!`)
  }

  return foundProduct
}

const deleteProduct = async (
  productId: string
): Promise<ProductDocument | null> => {
  const foundProduct = Product.findByIdAndDelete(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Movie ${productId} not found!`)
  }

  return foundProduct
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteProduct,
  search,
}

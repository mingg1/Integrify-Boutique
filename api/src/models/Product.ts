import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  description?: string
  price: number
  thumbnail?: string
  category?: string[]
  size?: string[]
  quantity: number
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: [String],
  },
  size: {
    type: [String],
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 0,
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)

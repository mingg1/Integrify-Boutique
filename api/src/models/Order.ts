import mongoose, { Document } from 'mongoose'
import { ProductDocument, Size } from './Product'

export interface Item {
  product: mongoose.Types.ObjectId
  quantity: number
  size: Size
}

export type OrderDocument = Document & {
  user: mongoose.Types.ObjectId
  items: Item[]
}

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  items: {
    type: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        size: { type: String, enum: Size, required: true },
      },
    ],
    required: true,
  },
})

export default mongoose.model<OrderDocument>('Order', orderSchema)

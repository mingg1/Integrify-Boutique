import mongoose, { Document } from 'mongoose'
import { ProductDocument, Size } from './Product'

export interface Item {
  productId: string
  quantity: number
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
        productId: String,
        quantity: Number,
      },
    ],
    required: true,
  },
})

export default mongoose.model<OrderDocument>('Order', orderSchema)

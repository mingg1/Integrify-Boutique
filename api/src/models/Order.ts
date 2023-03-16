import mongoose, { Document } from 'mongoose'

export interface Item {
  product: mongoose.Types.ObjectId
  quantity: number
  size: mongoose.Types.ObjectId
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
  items: [
    {
      type: {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        size: { type: mongoose.Types.ObjectId, ref: 'Size', required: true },
      },
      required: true,
    },
  ],
})

export default mongoose.model<OrderDocument>('Order', orderSchema)

import mongoose, { Document } from 'mongoose'

export enum Size {
  XSmall = 'XS',
  Small = 'S',
  Medium = 'M',
  Large = 'L',
  XLarge = 'XL',
}

export type SizeDocument = Document & {
  item: mongoose.Types.ObjectId
  size: Size
  quantity: number
}

const sizeSchema = new mongoose.Schema({
  item: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true,
  },
  size: {
    type: String,
    enum: Size,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 0,
  },
})

export default mongoose.model<SizeDocument>('Size', sizeSchema)

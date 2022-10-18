import mongoose, { Document } from 'mongoose'

export enum ProductCategory {
  Top = 'top',
  Bottom = 'bottom',
  Sweater = 'sweater',
  Jacket = 'jacket',
  Coat = 'coat',
  Tshirt = 't-shirt',
  Jeans = 'jeans',
  Skirt = 'skirt',
  Dress = 'dress',
  Accessory = 'accessory',
  Shoes = 'shoes',
  Bag = 'bag',
}
export enum Size {
  XSmall = 'XS',
  Small = 'S',
  Medium = 'M',
  Large = 'L',
  XLarge = 'XL',
}

export type ProductDocument = Document & {
  name: string
  description?: string
  price: number
  thumbnail?: string
  category?: ProductCategory[]
  size?: Size[]
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
    enum: ProductCategory,
    required: true,
  },
  size: {
    type: [String],
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

export default mongoose.model<ProductDocument>('Product', productSchema)

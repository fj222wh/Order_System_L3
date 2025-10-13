/**
 * @module OrderModel
 * @author Filippa Johansson
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const schema = new mongoose.Schema({
  orderId: {
    type: Number,
    trim: true,
    minlength: 0
  },
  totalPrice: {
    type: Number,
    trim: true,
    minlength: 0
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
})

// Add the base schema to this schema
schema.add(BASE_SCHEMA)

export const OrderModel = mongoose.model('Order', schema)

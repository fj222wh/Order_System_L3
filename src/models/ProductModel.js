/**
 * @module ProductModel
 * @author Filippa Johansson
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [1, 'Can not save an empty name.'],
    trim: true
  },
  price: {
    type: Number,
    trim: true
  },
  description: {
    type: String,
    minlength: 1,
    trim: true
  },
  category: {
    type: String,
    minlength: 1,
    trim: true
  },
  productId: {
    type: Number,
    trim: true
  }
})

// Add the base schema to this schema
schema.add(BASE_SCHEMA)

export const ProductModel = mongoose.model('product', schema)

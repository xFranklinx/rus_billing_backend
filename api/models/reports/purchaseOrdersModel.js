const mongoose = require('mongoose')

const purchaseOrdersSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  purchaseOrderNumber: {
    type: String,
    required: true
  },
  billingSpecialistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accountingDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  invoiceDate: {
    type: Date,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  remainingAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Presented', 'Unpresented'],
    default: 'unpresented'
  },

  meta: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastModifiedAt: {
      type: Date,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }
})

const purchaseOrdersModel = mongoose.model('purchase order', purchaseOrdersSchema, 'purchase orders')

module.exports = purchaseOrdersModel
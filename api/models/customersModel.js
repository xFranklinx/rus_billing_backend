const mongoose = require('mongoose')

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
    required: true
  },
  department: {
    type: String,
    enum: ['DATA', 'DEXP', 'CEL', 'RTD', 'FRN'],
    required: true
  },
  goLiveDate: {
    type: Date,
    required: false
  },
  terminationDate: {
    type: Date,
    required: false
  },

  contact: {
    primaryContactName: {
      type: String,
      required: false
    },
    primaryContactEmail: {
      type: String,
      required: false,
      unique: true
    },
    primaryContactPhone: {
      type: String,
      required: false
    },
    secondaryContactName: {
      type: String,
      required: false
    },
    secondaryContactEmail: {
      type: String,
      required: false
    },
    secondaryContactPhone: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zip: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },

  meta: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastModifiedAt: {
      type: Date,
      default: Date.now
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
})

const customersModel = mongoose.model('customer', customersSchema, 'customers')

module.exports = customersModel
// models/Form.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  resourceName: String,
  weekEndingDate: String
});

const formSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  responses: {
    didOriginalHoursEnteredInRepliconGenerateInvoice: String,
    serviceLine: String,
    customerId: Number,
    customerName: String,
    typeOfAdjustment: String,
    isAdditionalIncidentalRequestRequired: String,
    isRoaRequired: String,
    typeOfCorrection: [String], // Array of strings
    whyCorrectionIsNeeded: String,
    adjustmentReasonDetails: String,
    submittedOnBehalfOf: String,
    invoicesToBeAdjusted: [String], // Array of strings
    resourceNameAndWeekEndingDatesAdjustmentIsFor: [resourceSchema], // Array of objects
    approversFullName: String,
    approversTitle: String,
    approversEmailAddress: String,
    netDollarAmountofAdjustmentRequested: Number,
    approvalLevel: String
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;

const mongoose = require('mongoose');

// Define required fields for each form type
const requiredFieldsByType = {
  SolutionsBillingAdjustment: [
    // 'didOriginalHoursEnteredInRepliconGenerateInvoice',
    // 'serviceLine',
    // 'customerId',
    // 'customerName',
    // 'typeOfAdjustment',
    // 'isAdditionalIncidentalRequestRequired',
    // 'isRoaRequired',
    // 'typeOfCorrection',
    // 'whyCorrectionIsNeeded',
    // 'adjustmentReasonDetails',
    // 'submittedOnBehalfOf',
    // 'invoicesToBeAdjusted',
    // 'resourceNameAndWeekEndingDatesAdjustmentIsFor',
    // 'approversFullName',
    // 'approversTitle',
    // 'approversEmailAddress',
    // 'netDollarAmountofAdjustmentRequested',
    // 'approvalLevel'
  ],
  HRS: [
    // Define required fields for HRS form here
    'hrsSpecificField1',
    'hrsSpecificField2',
    // ... other HRS-specific fields ...
  ],
  MSP: [
    // Define required fields for MSP form here
    'mspSpecificField1',
    'mspSpecificField2',
    // ... other MSP-specific fields ...
  ],
  CEL: [
    // Define required fields for CEL form here
    'celSpecificField1',
    'celSpecificField2',
    // ... other CEL-specific fields ...
  ]
};

const adjustmentFormsSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
    enum: ['SolutionsBillingAdjustment', 'HRS', 'MSP', 'CEL']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responses: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (responses) {
        const requiredFields = adjustmentFormsSchema.statics.getRequiredFields(this.formType);
        return requiredFields.every(field => responses.hasOwnProperty(field) && responses[field] != null);
      },
      message: props => `Missing required fields in responses for ${props.value.formType}`
    }
  }
}, { strict: false });

// Custom method to get required fields based on form type
adjustmentFormsSchema.statics.getRequiredFields = function (formType) {
  return requiredFieldsByType[formType] || [];
};

const AdjustmentFormsModel = mongoose.model('form - billing adjustment', adjustmentFormsSchema, 'form - billing adjustments');

module.exports = AdjustmentFormsModel;
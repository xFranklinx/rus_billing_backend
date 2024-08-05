const mongoose = require('mongoose');
const AdjustmentFormsModel = require('../api/models/forms/billingAdjustmentFormsModel');
const users = require('./staticUserData.json');
const colors = require('colors')
const dotenv = require('dotenv').config({ path: './config/config.env' })

const PORT = process.env.PORT || 5000
// MongoDB Connection
const mongoDB = require('../config/mongoDB');
mongoDB.connect()

// Helper function to get a random user ID
const getRandomUserId = () => {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex]._id;
};

// Helper function to get a random date within the last year
const getRandomDate = () => {
  const now = new Date();
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  return new Date(oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime()));
};

// Helper function to generate random form data
const generateFormData = (formType) => {
  const baseData = {
    submittedBy: getRandomUserId(),
    submittedAt: getRandomDate(),
    formType: formType,
    responses: {
      submittedOnBehalfOf: getRandomUserId(),
      approversFullName: users[Math.floor(Math.random() * users.length)].name,
      approversEmailAddress: users[Math.floor(Math.random() * users.length)].email,
    }
  };

  switch (formType) {
    case 'SolutionsBillingAdjustments':
      return {
        ...baseData,
        responses: {
          ...baseData.responses,
          didOriginalHoursEnteredInRepliconGenerateInvoice: Math.random() > 0.5 ? 'Yes' : 'No',
          serviceLine: ['IT', 'Finance', 'HR', 'Marketing'][Math.floor(Math.random() * 4)],
          customerId: Math.floor(Math.random() * 1000) + 1000,
          customerName: ['Acme Corp', 'Globex', 'Initech', 'Umbrella Corp'][Math.floor(Math.random() * 4)],
          typeOfAdjustment: ['Credit', 'Debit'][Math.floor(Math.random() * 2)],
          isAdditionalIncidentalRequestRequired: Math.random() > 0.5 ? 'Yes' : 'No',
          isRoaRequired: Math.random() > 0.5 ? 'Yes' : 'No',
          typeOfCorrection: ['Hours', 'Rate', 'Both'][Math.floor(Math.random() * 3)],
          whyCorrectionIsNeeded: 'Random reason for correction',
          adjustmentReasonDetails: 'Detailed explanation of the adjustment',
          invoicesToBeAdjusted: [`INV-${Math.floor(Math.random() * 10000)}`],
          resourceNameAndWeekEndingDatesAdjustmentIsFor: [{
            resourceName: users[Math.floor(Math.random() * users.length)].name,
            weekEndingDate: new Date().toISOString().split('T')[0]
          }],
          approversTitle: ['Manager', 'Director', 'VP'][Math.floor(Math.random() * 3)],
          netDollarAmountofAdjustmentRequested: Math.floor(Math.random() * 10000) - 5000,
          approvalLevel: ['L1', 'L2', 'L3'][Math.floor(Math.random() * 3)]
        }
      };
    case 'HRS':
      return {
        ...baseData,
        responses: {
          ...baseData.responses,
          hrsSpecificField1: 'HRS Specific Value 1',
          hrsSpecificField2: 'HRS Specific Value 2',
          // Add more HRS-specific fields as needed
        }
      };
    case 'MSP':
      return {
        ...baseData,
        responses: {
          ...baseData.responses,
          mspSpecificField1: 'MSP Specific Value 1',
          mspSpecificField2: 'MSP Specific Value 2',
          // Add more MSP-specific fields as needed
        }
      };
    case 'CEL':
      return {
        ...baseData,
        responses: {
          ...baseData.responses,
          celSpecificField1: 'CEL Specific Value 1',
          celSpecificField2: 'CEL Specific Value 2',
          // Add more CEL-specific fields as needed
        }
      };
  }
};

// Seed function
const seedForms = async () => {
  try {
    // Clear existing forms
    await AdjustmentFormsModel.deleteMany({});

    // Generate and insert SolutionsBillingAdjustments forms
    for (let i = 0; i < 10; i++) {
      const formData = generateFormData('SolutionsBillingAdjustments');
      await AdjustmentFormsModel.create(formData);
    }

    // Generate and insert HRS forms
    for (let i = 0; i < 3; i++) {
      const formData = generateFormData('HRS');
      await AdjustmentFormsModel.create(formData);
    }

    // Generate and insert MSP forms
    for (let i = 0; i < 3; i++) {
      const formData = generateFormData('MSP');
      await AdjustmentFormsModel.create(formData);
    }

    // Generate and insert CEL forms
    for (let i = 0; i < 3; i++) {
      const formData = generateFormData('CEL');
      await AdjustmentFormsModel.create(formData);
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding forms:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Run the seeder
seedForms();

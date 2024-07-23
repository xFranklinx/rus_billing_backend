// seed.js
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Customer = require('../api/models/customersModel');
const User = require('../api/models/usersModel');
const PurchaseOrder = require('../api/models/reports/purchaseOrdersModel');

mongoose.connect('mongodb+srv://NodeConnection:Greenway1@cluster0.nj8zecw.mongodb.net/rus_billing?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const generateData = async () => {
  const users = [];
  const customers = [];
  const purchaseOrders = [];

  // Generate 10 users
  for (let i = 0; i < 10; i++) {
    const user = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      accountType: faker.helpers.arrayElement(['Manager', 'Team Lead', 'Team Member']),
      department: faker.commerce.department(),
      position: faker.person.jobTitle(),
      createdAt: faker.date.past(),
      lastLoginDate: faker.date.recent(),
    });
    users.push(user);
  }

  await User.insertMany(users);
  console.log('Users inserted');

  // Generate 10 customers
  for (let i = 0; i < 10; i++) {
    const customer = new Customer({
      name: faker.company.name(),
      status: faker.helpers.arrayElement(['Active', 'Inactive']),
      department: faker.helpers.arrayElement(['DATA', 'DEXP', 'CEL', 'RTD', 'FRN']),
      goLiveDate: faker.date.past(),
      terminationDate: faker.date.future(),
      contact: {
        primaryContactName: faker.person.fullName(),
        primaryContactEmail: faker.internet.email(),
        primaryContactPhone: faker.phone.number(),
        secondaryContactName: faker.person.fullName(),
        secondaryContactEmail: faker.internet.email(),
        secondaryContactPhone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        country: faker.location.country(),
      },
      meta: {
        createdAt: faker.date.past(),
        lastModifiedAt: faker.date.recent(),
        createdBy: users[faker.number.int({ min: 0, max: 9 })]._id,
        lastModifiedBy: users[faker.number.int({ min: 0, max: 9 })]._id,
      },
    });
    customers.push(customer);

    // Generate purchase orders for each customer
    for (let j = 0; j < 5; j++) {
      const purchaseOrder = new PurchaseOrder({
        customerId: customer._id,
        purchaseOrderNumber: faker.finance.accountNumber(),
        billingSpecialistId: users[faker.number.int({ min: 0, max: 9 })]._id,
        accountingDate: faker.date.past(),
        dueDate: faker.date.future(),
        invoiceDate: faker.date.recent(),
        totalAmount: faker.finance.amount(),
        remainingAmount: faker.finance.amount(),
        status: faker.helpers.arrayElement(['Presented', 'Unpresented']),
        meta: {
          createdAt: faker.date.past(),
          lastModifiedAt: faker.date.recent(),
          createdBy: users[faker.number.int({ min: 0, max: 9 })]._id,
          lastModifiedBy: users[faker.number.int({ min: 0, max: 9 })]._id,
        },
      });
      purchaseOrders.push(purchaseOrder);
    }
  }

  await Customer.insertMany(customers);
  console.log('Customers inserted');

  await PurchaseOrder.insertMany(purchaseOrders);
  console.log('PurchaseOrders inserted');

  mongoose.disconnect();
  console.log('MongoDB disconnected');
};

generateData().catch(err => {
  console.error('Error generating data:', err);
  mongoose.disconnect();
});

// Script to seed demo users (Tenant, Owner, Admin) into the database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/homes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const demoUsers = [
  {
    firstName: 'Amit',
    lastName: 'Sharma',
    email: 'amit.sharma@email.com',
    password: bcrypt.hashSync('password123', 10),
    phone: '9876543210',
    role: 'tenant',
    familySize: 4,
    preferredBudgetMin: 20000,
    preferredBudgetMax: 50000,
    preferredLocations: ['Hyderabad'],
    isVerified: true
  },
  {
    firstName: 'Priya',
    lastName: 'Singh',
    email: 'priya.singh@email.com',
    password: bcrypt.hashSync('password123', 10),
    phone: '9876543211',
    role: 'owner',
    isVerified: true
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@familyrent.com',
    password: bcrypt.hashSync('password123', 10),
    phone: '9876543212',
    role: 'admin',
    isVerified: true
  }
];

User.insertMany(demoUsers)
  .then(() => {
    console.log('Demo users seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding demo users:', err);
    mongoose.connection.close();
  });

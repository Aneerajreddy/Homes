// Script to update demo users' passwords to bcrypt hash
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/homes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const demoUsers = [
  'amit.sharma@email.com',
  'priya.singh@email.com',
  'admin@familyrent.com'
];

const updatePasswords = async () => {
  for (const email of demoUsers) {
    const user = await User.findOne({ email });
    if (user) {
      user.password = bcrypt.hashSync('password123', 10);
      await user.save();
      console.log(`Password updated for ${email}`);
    } else {
      console.log(`User not found: ${email}`);
    }
  }
  mongoose.connection.close();
};

updatePasswords();

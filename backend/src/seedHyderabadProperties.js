// Script to seed 100 sample Hyderabad properties into the database
const mongoose = require('mongoose');
const Property = require('./models/Property');

mongoose.connect('mongodb://localhost:27017/homes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProperties = Array.from({ length: 100 }, (_, i) => ({
  title: `Spacious Apartment ${i + 1} in Hyderabad`,
  description: `Beautiful 2/3 BHK apartment located in prime area of Hyderabad. Modern amenities, secure locality, and easy access to schools, hospitals, and shopping.`,
  city: 'Hyderabad',
  location: 'Hyderabad',
  address: `Road No. ${Math.floor(Math.random() * 50) + 1}, Banjara Hills, Hyderabad`,
  price: Math.floor(Math.random() * 30000) + 10000,
  bedrooms: [2, 3][Math.floor(Math.random() * 2)],
  bathrooms: [2, 3][Math.floor(Math.random() * 2)],
  furnished: Math.random() > 0.5,
  owner: new mongoose.Types.ObjectId(), // Replace with valid owner IDs if needed
  images: [
    'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  ],
  available: true,
  status: 'verified',
}));

Property.insertMany(sampleProperties)
  .then(() => {
    console.log('100 Hyderabad properties seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding properties:', err);
    mongoose.connection.close();
  });

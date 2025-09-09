const Property = require('../models/Property');

exports.getAll = async (req, res) => {
  const {
    location,
    minPrice = 0,
    maxPrice = 100000,
    bedrooms = 0,
    bathrooms = 0,
    propertyType = 'all',
    page = 1,
    limit = 6
  } = req.query;

  console.log('Incoming property search query:', req.query);

  const query = {
    status: 'verified',
    price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    bedrooms: { $gte: Number(bedrooms) },
    bathrooms: { $gte: Number(bathrooms) }
  };
  if (location) {
    query.$or = [
      { title: { $regex: location, $options: 'i' } },
      { location: { $regex: location, $options: 'i' } }
    ];
  }
  if (propertyType !== 'all') {
    query.propertyType = propertyType;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const properties = await Property.find(query)
    .populate('owner', 'name email')
    .skip(skip)
    .limit(Number(limit));

  console.log('MongoDB query:', query);
  console.log('Properties found:', properties.length);

  const total = await Property.countDocuments(query);
  const hasMore = skip + properties.length < total;

  res.json({ properties, hasMore });
};

exports.create = async (req, res) => {
  const property = await Property.create({ ...req.body, owner: req.user.id });
  res.status(201).json(property);
};

exports.update = async (req, res) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(property);
};

exports.delete = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: 'Property deleted' });
};

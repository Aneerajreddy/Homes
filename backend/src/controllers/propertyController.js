const Property = require('../models/Property');

exports.getAll = async (req, res) => {
  const properties = await Property.find().populate('owner', 'name email');
  res.json(properties);
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

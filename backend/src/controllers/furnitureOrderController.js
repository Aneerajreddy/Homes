const FurnitureOrder = require('../models/FurnitureOrder');

exports.getAll = async (req, res) => {
  const orders = await FurnitureOrder.find().populate('property');
  res.json(orders);
};

exports.create = async (req, res) => {
  const order = await FurnitureOrder.create(req.body);
  res.status(201).json(order);
};

exports.update = async (req, res) => {
  const order = await FurnitureOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
};

exports.delete = async (req, res) => {
  await FurnitureOrder.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
};

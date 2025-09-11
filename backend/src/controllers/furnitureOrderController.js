const { furnitureOrderService } = require('../services/database');

exports.getAll = async (req, res) => {
  try {
    const orders = await furnitureOrderService.findAll();
    res.json(orders);
  } catch (err) {
    console.error('Furniture order fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const order = await furnitureOrderService.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error('Furniture order creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const order = await furnitureOrderService.updateById(req.params.id, req.body);
    res.json(order);
  } catch (err) {
    console.error('Furniture order update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    await furnitureOrderService.deleteById(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error('Furniture order deletion error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

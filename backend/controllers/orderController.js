const Order = require('../models/Order');

exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    Order.getUserOrders(userId, (err, orders) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching user orders', error: err });
      }
      res.status(200).json(orders);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

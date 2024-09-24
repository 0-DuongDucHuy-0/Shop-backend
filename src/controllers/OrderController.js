const OrderServices = require("../services/OrderServices");

const createOrder = async (req, res) => {
  try {
    const {
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalsPrice,
      fullName,
      address,
      phone,
    } = req.body;
    if (
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalsPrice ||
      !fullName ||
      !address ||
      !phone
    ) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Thiếu thông tin",
      });
    }
    const result = await OrderServices.createOrder(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createOrder,
};

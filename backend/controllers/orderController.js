const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create New Order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo: req.body.paymentInfo, // Use the paymentInfo from the request body
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create order",
    });
  }
});

//Get Single Order -- User
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get LoggedIn user order -- User
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get All Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  totalAmount = Number(totalAmount);
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update Orders Status -- Admin
async function updateStock(id, quantity) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    // Check if there is enough stock to fulfill the order.
    if (product.stock < quantity) {
      throw new Error("Insufficient stock for this product");
    }

    // Deduct the ordered quantity from the product's stock.
    product.stock -= quantity;

    // Save the updated product back to the database.
    await product.save({ validateBeforeSave: false });
  } catch (error) {
    throw error;
  }
}

// Define exports.updateOrder
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order Not Found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order", 404)
      );
    }

    for (const orderItem of order.orderItems) {
      await updateStock(orderItem.product, orderItem.quantity);
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler("Order is already delivered", 500));
  }
};

//Delete Order -- Admin
exports.deleteOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

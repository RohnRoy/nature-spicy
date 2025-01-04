const razorpay = require("../../helpers/razorpay");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const { userId, addressInfo, totalAmount, orderStatus, cartId } = req.body;

    const options = {
      amount: totalAmount * 100, // Convert to smallest currency unit
      currency: "INR",
      receipt: `receipt_${cartId}`,
    };
    // find cart items using cartId and populate the product details saved in the order
    const cart = await Cart.findById(cartId).populate("items.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const flattenedCartItems = cart.items.map((item) => ({
      ...item.productId.toObject(),
      quantity: item.quantity,
      _id: item._id,
    }));

    const order = await razorpay.orders.create(options);

    const newOrder = new Order({
      userId,
      cartId,
      cartItems: flattenedCartItems,
      addressInfo,
      orderStatus,
      paymentMethod: "Razorpay",
      paymentStatus: "Pending",
      totalAmount,
      paymentId: order.id,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: order.id,
    });
  } catch (error) {
    console.error("Error while creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred during Razorpay order creation",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const razorpayOptions = {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      signature: razorpay_signature,
    };

    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = hmac.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    order.paymentStatus = "Paid";
    order.orderStatus = "Confirmed";
    order.paymentId = razorpay_payment_id;
    await order.save();
    // remove the items from the cart after successful payment
    const cart = await Cart.findById(order.cartId);
    if (cart) {
      cart.items = cart.items.filter(
        (item) =>
          !order.cartItems.find(
            (cartItem) => cartItem._id.toString() === item._id.toString()
          )
      );
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment successful and order confirmed",
    });
  } catch (error) {
    console.error("Error capturing Razorpay payment:", error);
    res.status(500).json({
      success: false,
      message: "Error capturing payment",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow cancellation if order is in pending state
    if (order.orderStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel order at this stage",
      });
    }

    order.orderStatus = "cancelled";
    order.orderUpdateDate = new Date();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while cancelling order",
    });
  }
};

const createPaymentForPendingOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Payment can only be made for pending orders",
      });
    }

    const options = {
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${order._id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    order.paymentId = razorpayOrder.id;
    await order.save();

    res.status(200).json({
      success: true,
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
    });
  } catch (error) {
    console.error("Error creating payment for pending order:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred during payment creation",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
  cancelOrder,
  createPaymentForPendingOrder,
};

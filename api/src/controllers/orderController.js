import {
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_SHIPPED,
} from "../constants/orderStatus.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import User from "../models/User.js";
import orderService from "../services/orderService.js";

const getAll = async (req, res) => {
  try {
    const data = await orderService.getAll(req.query);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req?.user.id;

    const data = await orderService.getOrdersByUser(req.query, userId);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getOrderById = async (req, res) => {
  const user = req.user;

  try {
    const id = req.params.id;

    const data = await orderService.getOrderById(id);

    if (data.userId != user.id && !user.roles.includes(ROLE_ADMIN)) {
      return res.status(403).send("Access denied");
    }

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const checkoutOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;
    const reqUser = req?.user;

    const order = await orderService.getOrderById(id);

    if (order.userId != reqUser.id && !reqUser.roles.includes(ROLE_ADMIN)) {
      return res.status(403).send("Access denied");
    }

    if (!input.returnUrl)
      return res.status(404).send("Return url is required.");

    if (!input.websiteUrl)
      return res.status(404).send("Website url is required.");

    if (!input.totalAmount)
      return res.status(404).send("Total amount is required.");

    if (!input.orderName)
      return res.status(404).send("Order name is required.");

    const user = await User.findById(reqUser.id);

    if (
      !user?.address ||
      !user?.address.city ||
      !user?.address.country ||
      !user?.address.province
    )
      throw {
        statusCode: 422,
        message: "Shipping address is required.",
      };

    if (!user?.phone)
      throw {
        statusCode: 422,
        message: "Phone number is required.",
      };

    const data = await orderService.checkoutOrder(id, input, user);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const input = req.body;
    const userId = req?.user.id;

    if (!input.orderItems)
      throw {
        statusCode: 422,
        message: "Order items are empty.",
      };

    const data = await orderService.createOrder(input, userId);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;

    if (!input.orderItems)
      throw {
        statusCode: 422,
        message: "Order items are empty.",
      };

    const data = await orderService.updateOrder(id, input);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const confirmOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.query?.status;

    const data = await orderService.confirmOrder(id, status);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;

    if (!input.status)
      throw {
        statusCode: 422,
        message: "Status is required.",
      };

    if (
      input.status !== ORDER_STATUS_SHIPPED &&
      input.status !== ORDER_STATUS_COMPLETED
    )
      throw {
        statusCode: 400,
        message: "Status not allowed.",
      };

    const data = await orderService.updateOrderStatus(id, input.status);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  const user = req?.user;

  try {
    const order = await orderService.getOrderById(id);

    if (order.userId != user.id && !user.roles.includes(ROLE_ADMIN)) {
      return res.status(403).send("Access denied");
    }

    await orderService.deleteOrder(id);

    res.send("Order deleted successfully.");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export {
  checkoutOrder,
  confirmOrder,
  createOrder,
  deleteOrder,
  getAll,
  getOrderById,
  getOrdersByUser,
  updateOrder,
  updateOrderStatus,
};

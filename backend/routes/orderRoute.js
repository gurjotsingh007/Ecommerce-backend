const express = require("express");
const { createOrder, getSingleOrder, myOrder, getAllOrders, updateOrder, deleteOrders } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrder);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrders);

module.exports = router;
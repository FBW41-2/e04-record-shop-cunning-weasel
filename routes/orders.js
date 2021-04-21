const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrder,
  postOrder,
  putOrder,
  delOrder,
} = require("../controllers/ordersController");

// GET all orders
router.get("/", getAllOrders);

// GET a single order
router.get("/:id", getOrder);
/**
 * POST a order
 */
router.post("/", postOrder);

// update/ put order
router.put("/:id", putOrder);

// delete a order
router.delete("/:id", delOrder);

module.exports = router;

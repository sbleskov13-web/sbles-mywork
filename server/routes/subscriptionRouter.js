const Router = require("express");

const router = new Router();

const subscriptionController = require("../controllers/subscriptionController");

// Все тарифы
router.get("/", subscriptionController.getAll);

// Один тариф
router.get("/:id", subscriptionController.getOne);

module.exports = router;
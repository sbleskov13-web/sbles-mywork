const Router = require("express");

const router = new Router();

const subscriptionTypeController = require("../controllers/subscriptionTypeController");

// Все типы
router.get("/", subscriptionTypeController.getAll);

// Один тип
router.get("/:id", subscriptionTypeController.getOne);

module.exports = router;
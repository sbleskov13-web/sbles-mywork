const Router = require("express");

const router = new Router();

const builderController = require("../controllers/builderController");
const authMiddleware = require("../middleware/authMiddleware");

// Получить текущий конструктор пользователя
router.get("/", authMiddleware, builderController.getBuilder);

// Добавить подписку
router.post("/subscriptions", authMiddleware, builderController.addSubscription);

// Изменить подписку
router.put("/subscriptions/:id", authMiddleware, builderController.updateSubscription);

// Удалить подписку
router.delete("/subscriptions/:id", authMiddleware, builderController.removeSubscription);

// Получить итоговую стоимость
router.get("/price", authMiddleware, builderController.calculatePrice);

module.exports = router;
const Router = require("express");

const router = new Router();

const channelController = require("../controllers/channelController");
const authMiddleware = require("../middleware/authMiddleware");

// Все каналы пользователя
router.get("/", authMiddleware, channelController.getAll);

// Один канал
router.get("/:id", authMiddleware, channelController.getOne);

// Добавить канал
router.post("/", authMiddleware, channelController.create);

// Обновить канал
router.put("/:id", authMiddleware, channelController.update);

// Удалить канал
router.delete("/:id", authMiddleware, channelController.remove);

module.exports = router;
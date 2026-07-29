const Router = require("express");

const router = new Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Получить профиль текущего пользователя
router.get("/me", authMiddleware, userController.getCurrentUser);

// Обновить профиль
router.put("/me", authMiddleware, userController.update);

// Удалить аккаунт
router.delete("/me", authMiddleware, userController.remove);

module.exports = router;
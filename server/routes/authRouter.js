const Router = require("express");

const router = new Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


// Регистрация
router.post("/registration", authController.registration);

// Авторизация
router.post("/login", authController.login);

// Проверка JWT
router.get("/check", authMiddleware, authController.check);


module.exports = router;
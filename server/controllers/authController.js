const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Builder } = require("../models/models");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {
            id,
            email,
            role,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "24h",
        }
    );
};

class AuthController {

    // ===========================
    // Регистрация
    // ===========================

    async registration(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Некорректный email или пароль",
                });
            }

            const candidate = await User.findOne({
                where: {
                    email,
                },
            });

            if (candidate) {
                return res.status(400).json({
                    message: "Пользователь уже существует",
                });
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.create({
                email,
                password: hashPassword,
            });

            // сразу создаем конструктор подписок
            await Builder.create({
                userId: user.id,
            });

            const token = generateJwt(
                user.id,
                user.email,
                user.role
            );

            return res.json({
                token,
            });

        } catch (e) {
            next(e);
        }
    }

    // ===========================
    // Авторизация
    // ===========================

    async login(req, res, next) {
        try {

            const { email, password } = req.body;

            const user = await User.findOne({
                where: {
                    email,
                },
            });

            if (!user) {
                return res.status(404).json({
                    message: "Пользователь не найден",
                });
            }

            const comparePassword = bcrypt.compareSync(
                password,
                user.password
            );

            if (!comparePassword) {
                return res.status(401).json({
                    message: "Неверный пароль",
                });
            }

            const token = generateJwt(
                user.id,
                user.email,
                user.role
            );

            return res.json({
                token,
            });

        } catch (e) {
            next(e);
        }
    }

    // ===========================
    // Проверка токена
    // ===========================

    async check(req, res) {

        const token = generateJwt(
            req.user.id,
            req.user.email,
            req.user.role
        );

        return res.json({
            token,
        });

    }

}

module.exports = new AuthController();
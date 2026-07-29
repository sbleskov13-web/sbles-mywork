const Router = require("express");

const router = new Router();

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const builderRouter = require("./routes/builderRouter");
const subscriptionRouter = require("./routes/subscriptionRouter");
const subscriptionTypeRouter = require("./routes/subscriptionTypeRouter");
const channelRouter = require("./routes/channelRouter");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/builder", builderRouter);
router.use("/subscriptions", subscriptionRouter);
router.use("/subscription-types", subscriptionTypeRouter);
router.use("/channels", channelRouter);

module.exports = router;
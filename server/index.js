const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./db");
const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {

        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });

    } catch (e) {
        console.log(e);
    }
};

start();
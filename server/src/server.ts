import app from "./app"
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { connectRedis } from "./config/redis";
dotenv.config();

const port = process.env.PORT;
connectDB();
connectRedis();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
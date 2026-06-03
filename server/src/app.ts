import express from "express";
import cors from "cors";
import helmet from "helmet";
import conversationRoutes from "./routes/conversation.route";
import messageRoutes from "./routes/message.route";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/messages", messageRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

export default app;
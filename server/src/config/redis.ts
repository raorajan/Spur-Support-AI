import { createClient } from "redis";
import { env } from "./env";

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err.message);
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err: any) {
    console.warn("⚠️ Redis unavailable, running without cache:", err.message);
  }
};

export { redisClient };

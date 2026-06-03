import { createClient } from "redis";
import { env } from "./env";

const redisClient = createClient({
  url: env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries >= 3) {
        console.warn("⚠️ Redis unavailable after 3 attempts, running without cache.");
        return false;
      }
      return Math.min(retries * 500, 2000);
    },
  },
});

redisClient.on("error", (err) => {
  if (redisClient.isOpen || err.message.includes("ENOTFOUND") || err.message.includes("ECONNREFUSED")) {
    return;
  }
  console.error("Redis error:", err.message);
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

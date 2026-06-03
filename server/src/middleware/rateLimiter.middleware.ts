import rateLimit from "express-rate-limit";

// Limit each IP to 20 requests per minute to protect the OpenAI API
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, 
  message: {
    error: "Too many requests from this IP, please try again after a minute."
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

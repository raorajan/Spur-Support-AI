# Spur AI Support Agent

A production-ready mini AI support agent built as a take-home assignment for the Founding Full-Stack Engineer role at Spur.

## 🚀 Quick Start

### 1. Environment Setup
You'll need a PostgreSQL database and an OpenAI API key. Redis is highly recommended but optional (the app gracefully falls back to DB-only operations if Redis is unavailable).

**Backend (`/server/.env`):**
```env
PORT=8000
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
OPENAI_API_KEY=sk-proj-...
REDIS_URL=redis://default:<password>@<host>:<port>
```

**Frontend (`/client/.env`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 2. Database Setup (Migrations)
The project uses Drizzle ORM. To set up the database schemas:
```bash
cd server
npm install
npm run db:generate
npm run db:migrate
# or npm run db:push for quick syncing
```

### 3. Run Locally
Open two terminal instances.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
# Server runs on http://localhost:8000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
npm run dev
# App runs on http://localhost:3000
```

---

## 🏗️ Architecture Overview

The backend uses a strict **Repository-Service-Controller** architecture designed for a "boring makes money" scalable platform:

1. **Routes (`/routes`)**: Defines endpoints and attaches validation middlewares.
2. **Controllers (`/controllers`)**: Thin layer to extract req/res data. Wraps everything in a custom `catchAsync` utility to eliminate redundant try-catch blocks.
3. **Services (`/services`)**: Business logic lives here. `MessageService` orchestrates saving user messages, calling `AIService`, and saving AI responses.
4. **Repositories (`/repositories`)**: Exclusive data-access layer wrapping Drizzle ORM. This allows us to swap the DB or ORM later without touching business logic. Caching is also implemented at this layer.

### Interesting Design Decisions
- **Zod Everywhere**: Used heavily in `server/validators` to sanitize incoming API traffic, and in `client/types` to ensure runtime safety for data received from the backend.
- **Graceful Redis**: `CacheService` wraps the Redis client. If Redis goes down or isn't configured, the cache service silently catches errors and bypasses the cache, letting the app continue functioning via direct Postgres queries.
- **Zustand Persistence**: The `activeConversationId` is persisted in `localStorage` via Zustand middleware. If a user reloads the page, their session history is instantly restored.

---

## 🤖 LLM Notes

**Provider:** OpenAI (`gpt-4o-mini`)
I used `gpt-4o-mini` because it is blazingly fast and extremely cheap while maintaining excellent reasoning capabilities suitable for basic e-commerce support.

**Prompting:**
The agent is injected with a strict `SYSTEM_PROMPT` containing specific, fictional domain knowledge (Shipping Policy, Return Policy, Support Hours). 
I chose to encapsulate the OpenAI client in a dedicated `AIService.ts` file. This makes it trivial to swap out OpenAI for Claude or Llama down the road by simply changing this one service file.

**Context Window:**
Every new message sent to the backend fetches the conversation history from Postgres (or Redis), formats it into `{ role, content }` tuples, and appends the new user message. This ensures the LLM has full situational awareness of the chat.

---

## ⚖️ Trade-offs & "If I had more time..."

1. **Optimistic UI Reversions**: Currently, if the LLM fails, we display a friendly error message bubble. In a production system, we'd want a "Retry" button on that specific failed message payload.
2. **Rate Limiting**: I would implement an IP-based or Session-based rate limiter (using the Redis instance we already have) to prevent API abuse and control OpenAI costs.
3. **Token Capping**: The history sent to the LLM currently includes the *entire* conversation. If I had more time, I'd implement a sliding window (e.g., sending only the last 10-15 messages) or summarize older context to keep token counts strictly capped.
4. **Streaming**: Currently using a standard request/response cycle. For a snappier UX, I would implement Server-Sent Events (SSE) or WebSockets to stream the LLM tokens directly to the React frontend in real-time.

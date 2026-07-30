# Base Setup Stage
FROM oven/bun:1.3-slim AS base
WORKDIR /app

ENV NODE_ENV=production

# Dependencies Installation Stage
FROM base AS dependencies

COPY package.json bun.lock* ./

RUN bun ci

# Build or Compile application
FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY src/database/prisma ./src/database/prisma
COPY . .

ENV DATABASE_URL="postgresql://mock_user:mock_password@localhost:5432/mock_db"
RUN bunx prisma generate --schema=./src/database/prisma/schema.prisma

RUN bun run build

RUN bun install --production --frozen-lockfile 

# Application Production Grade
FROM oven/bun:1.3-slim AS release
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY --chown=bun:bun --from=builder /app/package*.json ./
COPY --chown=bun:bun --from=builder /app/node_modules ./node_modules
COPY --chown=bun:bun --from=builder /app/dist ./dist
COPY --chown=bun:bun --from=builder /app/src/database/prisma ./src/database/prisma

USER bun

EXPOSE 5000

ENTRYPOINT ["bun", "run", "dist/src/main.js"]

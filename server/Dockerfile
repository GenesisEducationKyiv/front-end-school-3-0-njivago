FROM node:20-alpine AS build

RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

COPY patches ./patches
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server ./server/

RUN pnpm install --frozen-lockfile --filter server --ignore-scripts
RUN pnpm --filter server build

EXPOSE 8000

ENV HOST=0.0.0.0
ENV PORT=8000

CMD ["node", "server/dist/index.js"]